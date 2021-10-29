require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')

module.exports = (req, res) => {

  const authorization = req.headers.accessToken;

  const token = authorization.split(" ")[1]

  // 클라이언트에서 보내온 엑세스토큰으로 토큰 검사 완료되면 엑세스토큰 제대로 발급받고 
  const data = tokenCheck(token);

  const userData = await db.user.findOne({
    where: { email: data.email }
  })

  if(!userData) {
    // 유요한 유저 정보가 안나온다는것은 엑세스토큰,리프레쉬 토큰 인증이 안된것!
    res.status(400).json({ message: "Token has expired Please log in again"} ); 
  }else {
    // 토큰 안의 유저 정보가 데이터베이스에 존재하면
    // 여기 부분은 에러날 가능성이 있으니 검토 해봐야할 부분!!
    const { comment_id } = req.body;

    db.comment_like.destroy({
        where: { comment_id: comment_id }
    })
    // 혹시몰라서 따로 뺀 코드 // 아니다 이걸 삭제하면 userData.id로 연동된 모든 좋아요가 삭제?? 
    // db.comment_like.destroy({
    //     where:{ user_id: userData.id }
    // })

    res.status(200).json({
        message: "deletion is complete"
    })
  }
}
