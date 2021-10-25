const { tokenCheck } = require("../../token")

module.exports = (req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];

  const token = tokenCheck(accessToken);

  if(!token) {
    //로그인 다시 하라는 메시지
    res.send("로그인 다시해")
  }else {
    //엑세스 토큰과 요청하는 데이터 모두 보내주기
    res.send("hello World")
  }
}