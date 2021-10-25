require("dotenv").config();
const jwt = require('jsonwebtoken');
const access_secret = process.env.ACCESS_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;

module.exports = {
  //엑세스 토큰 만들기
  createAccessToken: (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: "60m"})
    return accessToken;
  },
  //리프레시 토큰 만들기
  createRefreshToken: (payload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: "12h"})
    return refreshToken;
  },
  //토큰 검증 함수
  tokenCheck: (accessToken, refreshToken) => {
    //엑세스 토큰 복호화
    jwt.verify(accessToken,process.env.ACCESS_SECRET, (err,decoded) => {
      //엑세스 토큰 만료
      if(err) {
        //리프레시 토큰을 복호화
        jwt.verify(refreshToken, refresh_secret, (err, decoded) => {
          //리프레시 토큰도 만료시
          if(err) {
            
          }
        })
      }else {

      }
    })
  }
}