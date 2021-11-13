require("dotenv").config();
const db = require('../../../models');
const { Op } = require("sequelize");
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')


module.exports = async (req, res) => {
  //인증 정보
  const { authorization, refreshToken } = req.headers;
  //없으면 에러처리
  if(!authorization) {
    res.status(401).json({ message:"not authorized" });
    //인증 정보가 있으면
  }else {
    //토큰 분리
    const token = authorization.split(" ")[1]
    //토큰 검증 함수
    const check = await tokenCheck(token, res, refreshToken);
    if(!check) {
      res.status(401).json({ message:"not authorized" });
    }else {
      //검증된 토큰 결과로 (일반 회원은 이메일, 소셜로그인은 소셜로 확인) 유저 데이터 확인
      const search = {};
      // 이메일이 있으면
      if(check.email) {
        search.email = check.email
        // 소셜이 있으면
      } else {
        search.social = check.social
      }
      const userData = await db.user.findOne({
        // 검색조건이 객체이기 때문에 만들어둔 search 객체 로 데이터를 추적
        where: search  
        })
        //유저 정보가 없으면
      if(!userData) {
        res.status(404).json({ message: "invalid user"} ); 
        //유저 정보가 있으면
      }else {
        // 받아오는 데이터 구조분해 할당
        const { comment,video_id } = req.body;
        console.log('comments',comment) 
        console.log('comments',video_id )
      //필수 요소가 없으면 
        if(!comment || !video_id) {
      // 필수 요소를 채우라는 에러메시지를 보내주고
          res.status(422).json({message:"insufficient parameters supplied"})
        } else {
      // 모두 있으면
            db.comment.create({
            user_id: userData.dataValues.id, // 우리가 user테이블에서 찾은 id
            video_id: video_id,
            comment: comment
          })
  
          res.status(201).json({
            data: {
            comment:comment,
            video_id:video_id,
            accessToken: check.token
            },
            message:"Comment has been completed"
          })
        }
      }
    }
  }
}
