const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const controllers = require("./controllers")

const app = express();
app.use(express.json());
const HTTPS_PORT = 80;


app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

//로그인 로그아웃 회원가입
app.post("/signin", controllers.post_signin); //성근
app.post("/signup", controllers.post_signup); //재훈//완료
app.post("/signout", controllers.post_signout); //성근
app.post("/socialSignin", controllers.post_socialSignin);//재훈
//이메일 인증용도
app.get("/emailauth", controllers.get_emailauth);//재훈//완료

//마이비디오
//조회, 올리고, 수정하고, 삭제하고
app.get("/myvideo", controllers.get_myvideo);
app.post("/myvideo", controllers.post_myvideo);
app.put("/myvideo", controllers.put_myvideo);
app.delete("/myvideo", controllers.delete_myvideo);

//메인 페이지 전체 비디오 조회
app.get("/videos", controllers.get_videos); //성근

//유저인포
app.get("/userinfo", controllers.get_userinfo); //재훈
app.put("/userinfo", controllers.put_userinfo); //재훈
app.delete("/userinfo", controllers.delete_userinfo); //재훈

//코멘트
app.post("/comment", controllers.post_comment); //성근
app.put("/comment", controllers.put_comment); //성근
app.delete("/comment", controllers.delete_comment); //성근

//비디오 좋아요
app.post("/like/video", controllers.post_like); //재훈
app.get("/like/video", controllers.get_like);  //재훈
app.delete("/like/video", controllers.delete_like);  //재훈

//코멘트 좋아요
app.post("/like/comment", controllers.post_like); //성근
app.get("/like/comment", controllers.get_like); //성근
app.delete("/like/comment", controllers.delete_like); //성근


let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("Port : 80, server runnning"));

} else {
  server = app.listen(HTTPS_PORT)
}

module.exports = server;