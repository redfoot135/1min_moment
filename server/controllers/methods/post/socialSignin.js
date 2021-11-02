// const axios = require('axios');
const { createAccessToken, createRefreshToken } = require('../../token');


module.exports = (req, res) => {
  res.send("hello world")
  // //클라이언트에서 검증한 토큰과 아이디
  // const { token, id, where } = req.body;
  // //받아올 유저 정보
  // let userinfo;
  // //에러 처리
  // if(where !== "google" || where !== "kakao") {
  //   res.status(404).json({ message:"Invalid login information." })
  //   //구글일경우
  // }else if(where === "google") {
    
  // }




  // const userInfo = await db.user.findOne({
  //   where: { email: email } // 이메일로만 유저 정보 조회
  // })

  // if(!userInfo) {
  //   res.status(404).json({ message:"invalid email or password" })
  // } else {
  //   const inputpassword = jwt.sign(password, userInfo.dataValues.salt)

  //   if(userInfo.dataValues.password !== inputpassword) {
  //     res.status(404).json({ message:"invalid email or password" })
  //   }else {

  //     const payload = {
  //       id : userInfo.dataValues.id,
  //       name : userInfo.dataValues.name,
  //       email : userInfo.dataValues.email,
  //     }

  //     const accessToken = createAccessToken(payload)
  //     const refreshToken = createRefreshToken(payload)
       
  //     // 리프레쉬 토큰 db에 저장하기
  //     db.user.update({
  //       refreshToken: refreshToken
  //     }, {
  //       where: { email: email }
  //     })

            
  //   // 엑세스토큰 쿠키로 보내주기
  //     res.cookie("accessToken", accessToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: "none"
  //   })
  //   }


  //   res.status(200).json({
  //   data: {
  //     email: email,
  //     password: password // 해싱된 비밀번호가 아닌 그냥 원본 비밀번호를 보내줌
  // },
  //   message: "Information passed"
  // })
  // }
}