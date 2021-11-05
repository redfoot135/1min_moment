require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  //인증정보
  const authorization = req.headers['authorization'];
  if(!authorization) {
    res.status(401).json({ message:"not authorized" });
    //인증 정보가 있으면
  }else {
    const token = authorization.split(" ")[1]
  
    // 클라이언트에서 보내온 엑세스토큰으로 토큰 검사 완료되면 엑세스토큰 제대로 발급받고 
    const check = tokenCheck(token, res);
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
        // 토큰 안의 유저 정보가 데이터베이스에 존재하면
        // 여기 부분은 에러날 가능성이 있으니 검토 해봐야할 부분!!
        const { comment_id } = req.body;
    
        db.comment.destroy({
          where : { id: comment_id }
        })
    
        req.status(200).json({
          data:{
            accessToken: check.token
          },
          message:"deletion is complete"
        })
      }
    }
  }
}