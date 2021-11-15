const db = require('../../../models');
const { tokenCheck } = require('../../token')

module.exports = async (req, res) => {
  console.log(req.headers)
  const { id } = req.query; //또는 video_id
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
      db.video.destroy({where: {id: id}});
      res.status(200).json({
        data: {
          accessToken: check.token
        },
        message:"deletion is complete"
      });
    }
  }
}