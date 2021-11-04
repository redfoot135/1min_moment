require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../../token')
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  console.log(req.body)
  //클라이언트 요청 정보 선언(이름 이메일 패스워드)
  const { username, email, password } = req.body;
  console.log(username)
  console.log(email)
  console.log(password)
  const token = createRefreshToken({email: email});
  //각 유저마다 고유한 썰트 사용
  const saltRounds = 10;
  //혹시 유저 정보가 부족하게 왔다면
  if(!username || !email || !password ) {
    //에러 메시지 전송
    res.status(422).json({ message:"insufficient parameters supplied"})
    //정보가 제대로 왔다면
  }else {
    //암호화를 먼저 해주고 저장한다.
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      try{
        // 암호화가 성공햇을때
        //데이터베이스에서 이메일을 조회하고
        //이미 있으면 에러처리
        //없으면 새로 데이터베이스에 정보 입력
        await db.user.findOrCreate({
          //유저 테이블에서 이메일 조회
          where: {
            email: req.body.email
          },
          //이메일 없을시 넣어줄 값
          defaults: {
            email: email,
            name: username,
            //패스워드는 암호화해서 넣어줌.
            password: hash,
            //이메일 인증후에 정회원 여부 true로 바꿔줄 예정
            regularMember: false,
            //소셜 로그인 아이디 아님
            social: null,
            //이메일 인증에 사용할 임시 리프레시토큰(인증 후 삭제)(이후에는 로그인할 때 리프레시토큰 저장)
            refreshToken: token
          }
        })
        .then(([data, created]) => {
          //새로 만들지 않았으면
          if(!created) {
            res.status(409).json({ message: "This email already exists"})
          //새로 만들었으면 이메일 인증 메일 발송
          }else{
            //메일 발송 실패시 사용할 카운트
            let errorCount = 0;
            //인증 메일 발송 함수
            function sendEmail(toEmail) {
              //5번 전송 실패하면  
              if(errorCount === 5) {
                //저장된 데이터 다시 삭제
                db.user.destroy({where: {email: email}});
              }else {
                const authUser = process.env.AUTHUSER;
                const authPass = process.env.AUTHPASS;
                const fromEmail = process.env.FROMEMAIL;
                const transporter = nodemailer.createTransport({
                  host: "smtp.naver.com",
                  secure: true,
                  auth: {
                    user: authUser,
                    pass: authPass
                  }
                });
                
                let mailOptions = {
                  from: fromEmail,
                  to: toEmail,
                  subject: '1분 미만 회원가입 인증이메일입니다.',
                  html: `<div>
                    <h1>1분 미만 회원가입 인증이메일입니다. 아래 버튼을 눌러 회원가입을 완료해주세요.</h1>
                    <a href='https://localhost:80/emailauth?token=${token}'>회원가입 완료하기</a>
                  </div>`
                };
            
                //전송 시작!
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                      //에러
                      console.log(error);
                      errorCount++;
                      sendEmail(toEmail);
                  }
                  //전송 완료
                  console.log("Finish sending email : " + info.response);        
                  transporter.close()
              })}
            }
            //메일 발송
            sendEmail(email);
            
            //메일 전송 5번 모두 실패했으면
            if(errorCount === 5) {
              res.json("메일 전송 실패 다시 시도해")
              //메일 전송 성공했으면
            }else {
              //3시간 이내 인증안하면 데이터 삭제
              setTimeout(() => {
                db.user.findOne({where: {email: email}})
                .then((userinfo) => {
                  if(!userinfo.regularMember) {
                    db.user.destroy({where: {email: email}})
                  }
                })
                //3시간 뒤 실행
              }, 1000 * 60 * 60 * 3)
      
              //기존 보내온 데이터와 응답 메시지 전송
              res.status(201).json({
                data : { 
                  name: username,
                  email: email,
                  password: password,
                  //테스트 완료후 토큰은 지우기
                  token: token
                },
                message: "You have become an associate member. Please check your email to complete the verification process."
              })
            }
          }
        })
      }catch(err) {//예외처리
        console.log(err);
      }
    });
  }
}
