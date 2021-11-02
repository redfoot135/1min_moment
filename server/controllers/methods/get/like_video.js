require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  
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

    const videoLikeData = db.video_like.findAll({
      where: { user_id: userData.dataValues.id }
    })

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

    res.status(200).json({
      data: videoLikeData,
      message:"completed the inquiry"
    })
  }
}