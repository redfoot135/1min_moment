// const axios = require('axios');
const db = require('../../../models');
const { createAccessToken, createRefreshToken } = require('../../token');

//소셜 로그인은
//회원 정보가 이미 있으면 그냥 바로 로그인 처리
//회원 정보가 없으면 만들고 로그인 처리



module.exports = (req, res) => {
  console.log(req)
  //클라이언트에서 검증한 토큰과 아이디
  const { token, id, username } = req.body;
  if(!id) {
    res.json({message: "인증 정보 없음"});
  }else {
    const payload = { email: null, social: id };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    
    db.user.findOrCreate({
      where: { social: id }, 
      defaults: {
        email: null,
        name: username,
        password: null,
        regularMember: true,
        //소셜 로그인 아이디 아님
        social: id,
        authToken: null
      }
    })
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    })
    // 응답
    res.status(200).json({
      data: { accessToken: accessToken },
      message: "Information passed"
    })
  }
}