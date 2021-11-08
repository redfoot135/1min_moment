const bcrypt = require('bcryptjs');
const db = require('../../../models');
const { tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  const { password } = req.body;
  const { authorization, refreshToken } = req.headers;
  if(!authorization) {
    res.status(401).json({ message:"not authorized" });
    //인증 정보가 있으면
  }else {
    const token = authorization.split(" ")[1]
  
    // 클라이언트에서 보내온 엑세스토큰으로 토큰 검사 완료되면 엑세스토큰 제대로 발급받고 
    const check = await tokenCheck(token, res, refreshToken);
    if(!check) {
      res.status(401).json({ message:"not authorized" });
    }else {
      const search = {};
      if(check.email) {
        search.email = check.email
      }else {
        search.social = check.social
      }

      const userData = await db.user.findOne({
        where: search
      })

      if(!userData) {
        // 유요한 유저 정보가 없으면 보내는 에러 메시지
        res.status(404).json({ message: "invalid user"} ); 
      }else {
        bcrypt.compare(password, userData.dataValues.password, function(err, result) {
          if(!result) {
            res.status(404).json({ message:"invalid password" })
            //result 암호가 맞다면 올바른 응답을 보내준다.
          }else {
            res.status(200).json({ message: "비밀번호가 일치합니다" })
          }
        })
      }
    }
  }
};
