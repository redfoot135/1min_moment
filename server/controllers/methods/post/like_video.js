require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  //인증 정보
  const { authorization, refreshToken } = req.headers;
  //없으면 에러처리
  if(!authorization) {
    res.status(401).json({ message:"not authorized" });
    //인증 정보가 있으면
  }else {
    const token = authorization.split(" ")[1]
  
    // 클라이언트에서 보내온 엑세스토큰으로 토큰 검사 완료되면 엑세스토큰 제대로 발급받고 
    const check = await tokenCheck(token, res, refreshToken);
    if(!check) {
      res.status(401).json({ message:"not authorized" });
    } else {
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
        // 유요한 유저 정보가 안나온다는것은 엑세스토큰,리프레쉬 토큰 인증이 안된것!
        res.status(400).json({ message: "Token has expired Please log in again"} );
      }else {
        // 토큰 안의 유저 정보가 데이터베이스에 존재하면
        // 여기 부분은 에러날 가능성이 있으니 검토 해봐야할 부분!!
        // 받아오는 데이터 구조분해 할당
        const { video_id } = req.body;
    
        db.video_like.findOrCreate({
          //비디오 라이크 테이블에서 비디오테이블 id로 조회
          where: {
            video_id: video_id
          },
          //비디오 id가 없을시에 넣어줄 값
          defaults: {
            user_id:userData.dataValues.id,
            video_id:video_id
          }
        })
        .then(([data, created]) => {
          //이미 해당 비디오에 좋아요를 눌렀다면 에러 메시지 전송
          if(!created) {
            res.status(409).json({ message:"You can't like twice"})
          // 처음 좋아요를 눌렀다면
          }else {
            res.status(201).json({
              data: {
                video_id: video_id,
                accessToken: check.token
              },
              message: "Likes are reflected"
            })
          }
        })
      }
    }
  }
}