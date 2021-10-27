const { tokenCheck } = require("../../token");
const db = require('../../../models');
const { v4: uuidv4 } = require('uuid');

module.exports = (req, res) => {
  console.log(uuidv4())
  if(!req.headers.authorization) {
    res.send("인증정보 없어")
  }else {
    const accessToken = req.headers.authorization.split(' ')[1];
    const check = tokenCheck(accessToken);
  
    if(!check) {
      //로그인 다시 하라는 메시지
      res.send("로그인 다시해");
    }else {
      //엑세스 토큰과 요청하는 데이터 모두 보내주기
      db.user.findOne({where: {email: check.email}})
      .then((userinfo) => {
        
      })
      res.send("hello World")
    }
  }
}