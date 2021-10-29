require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')

module.exports = (req, res) => {
  
  const authorization = req.headers.accessToken;

  const token = authorization.split(" ")[1]

  // 클라이언트에서 보내온 엑세스토큰으로 토큰 검사 완료되면 엑세스토큰 제대로 발급받고 
  const data = tokenCheck(token);

  const userData = await db.user.findOne({
    where: { email: data.email }
  })

  if(!userData) {
    // 유요한 유저 정보가 안나온다는것은 엑세스토큰,리프레쉬 토큰 인증이 안된것!
    res.status(400).json({ message: "Token has expired Please log in again"} );
  }else {
    // 토큰 안의 유저 정보가 데이터베이스에 존재하면
    // 여기 부분은 에러날 가능성이 있으니 검토 해봐야할 부분!!
    // 받아오는 데이터 구조분해 할당
    const { comment_id } = req.body;

    db.comment_like.findOrCreate({
      //코멘트 라이크 테이블에서 코멘트테이블 id 로 조회
      where: {
        comment_id: comment_id
      },
      //코멘트 id가 없을시에 넣어줄 값
      defaults: {
        user_id:userData.dataValues.id,
        comment_id:comment_id
      }
    })
    .then(([data, created]) => {
      //이미 좋아요를 눌렀다면 에러 메시지 전송
      if(!created) {
        res.status(409).json({ message:"You can't like twice"})
      //새롭게 좋아요를 눌렀다면
      }else {
        // 새롭게 해싱할 페이로드 (토큰 생성을 위한)
        const payload = {
          id : userData.dataValues.id,
          name : userData.dataValues.name,
          email : userData.dataValues.email
        }

        // 새로운 엑세스토큰과 리프레쉬 토큰 생성 
        const accessToken = createAccessToken(payload)
        const refreshToken = createRefreshToken(payload)
        
        // 쿠키로 엑세스토큰 같이 보내주고
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
         })

        res.status(201).json({
          data: {
            user_id: data.dataValues.user_id,
            comment_id: data.dataValues.comment_id
          },
          message: "Likes are reflected"
        })
      }
    })
  }
}