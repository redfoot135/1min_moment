const db = require('../../../models');
const { tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  const { authorization, refreshToken } = req.headers;
  if(!authorization) {
    //인증 정보가 없으면
    res.status(401).json({ message:"not authorized" });
  }else {
    //토큰만 거르기
    const token = authorization.split(' ')[1];
    //토큰 검증 함수
    const check = await tokenCheck(token, res, refreshToken);
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
    
      const userData = await db.user.findOne({
        where: search
      })
      //보내온 아이디와 비디오 테이블의 user_id와 같은 데이터만 조회
      const myvideos = await db.video.findAll({where: {user_id: userData.dataValues.id }});
      //응답(데이터가 아무것도 없어도 빈 배열 데이터로 보내줌)
      res.status(200).json({
        data: {
          myvideos: myvideos,
          accessToken: check.token
        },
        message:"completed the inquiry"
      })
    }
  }
}