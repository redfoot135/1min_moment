const db = require('../../../models');
const { tokenCheck } = require("../../token");
var ffmpeg = require('fluent-ffmpeg');
module.exports = async (req, res) => {
  
  const { title, video, thumbnail, category1, category2, category3} = req.body;
  console.log(req.body)
  const { authorization, refreshToken } = req.headers;
  //console.log(authorization)
  if(!authorization) {
    //인증 정보가 없으면
    res.status(401).json({ message:"not authorized" });
  }else {
    //토큰만 거르기
    const token = authorization.split(' ')[1];
    //토큰 검증 함수

    const check = await tokenCheck(token, res, refreshToken);
    console.log('checkkkkkkkkkk',check)
    console.log('toooooekekekn',token)

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
      //받아온 정보가 부족하면
      console.log('123444')
      if(!title || !video || !thumbnail || !category1) {
        res.status(422).json({message: "insufficient parameters supplied"});
      }else {
        console.log('1233333')
        const userinfo = await db.user.findOne({where: search });
        //video 테이블에 데이터 추가
        await db.video.create({
          title: title,
          user_id: userinfo.id,
          video: video,
          thumbnail: thumbnail,
          category1: category1,
          category2: category2,
          category3: category3
        })
        //응답
        res.status(200).json({
          data: {
            title: title,
            video: video,
            thumbnail: thumbnail,
            category1: category1,
            category2: category2,
            category3: category3,
            accessToekn: check.token
          },
          message: "Video registration is complete"
        })
      }
    }
  }
}