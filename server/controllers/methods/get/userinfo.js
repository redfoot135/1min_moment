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
      //이메일 정보로 유저 조회
      const userinfo = await db.user.findOne({where: search });
      //보내줄 정보
      const payload = {
        id: userinfo.dataValues.id,
        email: userinfo.dataValues.email,
        name: userinfo.dataValues.name,
        social: userinfo.dataValues.social
      }
      res.status(200).json({
        data: {
          userinfo: payload,
          accessToken: check.token
        },
        message: "Information passed"
      });
    }
  }
};
