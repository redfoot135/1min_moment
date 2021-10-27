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
  tokenCheck: async (accessToken) => {
    //엑세스 토큰 복호화
    let result;
    await jwt.verify(accessToken,access_secret, async (err,decoded) => {
      //엑세스토큰 만료시
      if(err) {
        const userdata = jwt.decode(accessToken, access_secret)
        //데이터 베이스에 들어있는 리프레시 토큰 확인
        // console.log(decoded)
        const data = await db.user.findOne({ where:{ email: userdata.email } })
        const refreshtoken = data.dataValues.refreshToken;
        //리프레시 토큰 복호화
        jwt.verify(refreshtoken, refresh_secret, (err, decoded) => {
          //리프레시토큰도 만료
          if(err) {
            //로그인 다시하라 요청
            result = null;
          }else {
            const payload = {
              id: decoded.id,
              email: decoded.email,
              name: decoded.name,
              password: decoded.password
            }
            const newAccessToken = jwt.sign(payload, access_secret, { expiresIn: "60m"});
            result = {token: newAccessToken, email: decoded.email};
          }
        })
      }else {
        //유효함
        result = {token: accessToken, email: decoded.email};
      }
    })
    return result;
  }
}