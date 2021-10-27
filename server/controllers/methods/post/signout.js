require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')
module.exports = (req, res) => {

  const authorization = req.headers.accessToken;

  const token = authorization.split(" ")[1]
  jwt.verify(token,process.env.ACCESS_SECRET , async function(err,decoded){
    if(err) {
      res.status(200).json({ message: "Logged out successfully"} ); //어차피 못쓰는 리프레쉬 토큰이기에 로그아웃 처리함
    }else {

      const tokenData = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        refreshToken: decoded.refreshToken, // 로그인할떄 update 로 리프레쉬토큰 넣어준게 여기 나올거고 // 이거 삭제됨
        password: decoded.password
      }

      const userData = await db.user.findOne({
        where: tokenData
      })

      if(!userData) {
        res.status(200).json({ message: "Logged out successfully"} ); //어차피 존재하지 않는 유저이기때문에 로그아웃 처리함
      }else {
        //데이터 베이스에 리프레시 토큰 삭제
        db.user.destory({
          where: { refreshToken: userData.refreshToken }
        })

        res.status(200).json({ message: "Logged out successfully"} );
      }
    }
  })
}
