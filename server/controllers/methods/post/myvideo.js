const { tokenCheck } = require("../../token");
const db = require('../../../models');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
// const multer = require('multer');

module.exports = async (req, res) => {
  //헤더에 인증 정보가 없으면
  if(!req.headers.authorization) {
    res.send("인증정보 없어")
    //인증정보 있으면
  }else {
    const accessToken = req.headers.authorization.split(' ')[1];
    const check = await tokenCheck(accessToken)
    if(!check) {
      //로그인 다시 하라는 메시지
      res.send("로그인 다시해");


      //인증완료 -------------------------------------------------------------------
    }else {
      //엑세스 토큰과 요청하는 데이터 모두 보내주기
      //유저 정보 조회
      const data = await db.user.findOne({where: {email: check.email}});
      const userinfo = data.dataValues;
      //클라이언트에서 보내온 영상과 썸네일 업로드
      const S3 = new AWS.S3({
        endpoint: new AWS.Endpoint(process.env.ENDPOINT),
        region: 'kr-standard',
        credentials: {
          accessKeyId: process.env.ACCESSKEY,
          secretAccessKey: process.env.SECRETKEY,
        },
      });

      const videoName = uuidv4();
      const video = new FormData();
      // const file = await
      video.append("video", )
      await S3.putObject({
        Bucket: process.env.BUCKET,
        Key: `${videoName}.mp4`,
        ACL: 'public-read',
        Body: '~Downloads/videos1/pexels-pavel-danilyuk-6460001.mp4',
        ContentType: 'video/mp4',
      }).promise();

      const link =`${process.env.ENDPOINT}/${process.env.BUCKET}/${videoName}.mp4`

      res.send(link)
    }
  }
}