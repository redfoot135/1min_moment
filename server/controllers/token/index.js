require("dotenv").config();
const jwt = require('jsonwebtoken');
const access_secret = process.env.ACCESS_SECRET;
const refresh_secret = process.env.REFRESH_SECRET;
const db = require('../../models');

module.exports = {
  //엑세스 토큰 만들기
  createAccessToken: (payload) => {
    const accessToken = jwt.sign(payload, access_secret, { expiresIn: "60m"})
    return accessToken;
  },
  //리프레시 토큰 만들기
  createRefreshToken: (payload) => {
    const refreshToken = jwt.sign(payload, refresh_secret, { expiresIn: "12h"})
    return refreshToken;
  },
  //토큰 검증 함수
  tokenCheck: (accessToken) => {
    //엑세스 토큰 복호화
    jwt.verify(accessToken,access_secret, (err,decoded) => {
      //엑세스토큰 만료시
      if(err) {
        //데이터 베이스에 들어있는 리프레시 토큰 확인
        db.user.findOne({ where:{ email: decoded.email } })
        .then((data) => {
          const refreshtoken = data.refreshToken;
          //리프레시 토큰 복호화
          jwt.verify(refreshtoken, refresh_secret, (err, decoded) => {
            //리프레시토큰도 만료
            if(err) {
              //로그인 다시하라 요청
              return null;
            }else {
              const payload = {
                id: data.id,
                email: data.email,
                name: data.name,
                password: data.password
              }
              const newAccessToken = this.createAccessToken(payload);
              return newAccessToken;
            }
          })
        })
      }else {
        //유효함
        return accessToken;
      }
    })
  }
}