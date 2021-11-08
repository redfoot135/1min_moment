require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  //인증 정보
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
        // 토큰 안의 유저 정보가 데이터베이스에 존재하면
        // 받아오는 데이터 구조분해 할당
        const { comment_id,comment } = req.body; // ㅇㅋ // ㅇㅇ
        //필수 요소인 수정 코멘트가 없으면 
        if(!comment) {
          // 수정 코멘트를 채우라는 에러메시지를 보내주고
          res.status(422).json({message:"insufficient parameters supplied"})
        } else {
          // 수정하려는 코멘트를 채웠다면
          db.comment.update({
            comment: comment
          }, {
            where: { id: comment_id }
          })
          res.status(201).json({
            data: {
              comment: comment,
              comment_id: comment_id,
              accessToken: check.token
            },
            message:"It is changed"
          })
        }
      }
    }
  }
}