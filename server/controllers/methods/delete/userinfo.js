const db = require('../../../models');
const { tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];
  if(!authorization) {
    //인증 정보가 없으면
    res.status(401).json({ message:"not authorized" });
  }else {
    //토큰만 거르기
    const token = authorization.split(' ')[1];
    //토큰 검증 함수
    const check = await tokenCheck(token, res);
    //엑세스토큰 & 리프레시토큰 유효하지 않으면
    if(!check) {
      res.status(401).json({ message:"not authorized" });
    }else {
      const search = {};
      if(check.email) {
        search.email = check.email
      }else {
        search.social = check.social
      }
      //회원 탈퇴
      await db.user.destroy({ where: search })
      //리프레쉬토큰 무효화 시켜서 보내주고 (회원탈퇴하는 사람에게 토큰을 안넘겨주기위해서)
      //테스트할때 오류가 날 가능성이 있어보임 
      res.cookie("refreshToken", null)
      //응답
      res.status(200).json({
        message: "deletion is complete"
      })
    }
  }
}