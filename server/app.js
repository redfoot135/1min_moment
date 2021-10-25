const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const controllers = require("./controllers")


const app = express();
app.use(express.json());
const HTTPS_PORT = 4000;


app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

app.post("/signin", controllers.post_signin);
app.post("/signup", controllers.post_signup);
app.post("/signout", controllers.post_signout);
app.post("/myvideo", controllers.post_myvideo);
app.post("/like", controllers.post_like);
app.post("/comment", controllers.post_comment);

app.get("/userinfo", controllers.get_userinfo);
app.get("/videos", controllers.get_videos);
app.get("/myvideo", controllers.get_myvideo);
app.get("/like", controllers.get_like);

app.put("/user/myvideo", controllers.put_myvideo);
app.put("/user/comment", controllers.put_comment);
app.put("/user/userinfo", controllers.put_userinfo);

app.delete("/userinfo", controllers.delete_userinfo);
app.delete("/myvideo", controllers.delete_myvideo);
app.delete("/comment", controllers.delete_comment);
app.delete("/like", controllers.delete_like);


let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("Port : 4000, server runnning"));

} else {
  server = app.listen(HTTPS_PORT)
}

module.exports = server;