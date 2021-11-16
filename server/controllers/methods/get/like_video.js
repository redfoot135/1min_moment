require("dotenv").config();
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME} = process.env;
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, tokenCheck } = require('../../token')
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : DATABASE_HOST,
  user     : DATABASE_USERNAME,
  password : DATABASE_PASSWORD,
  database : DATABASE_NAME,
  port     : DATABASE_PORT
});
connection.connect();

module.exports = async (req, res) => {
  //인증 정보
  const { cursor, sort, limit } = req.query;
  const { authorization, refreshToken } = req.headers;
  if(!authorization) {
    res.status(401).json({ message:"not authorized" });
    //인증 정보가 있으면
  }else {
    const token = authorization.split(" ")[1]
  
    // 클라이언트에서 보내온 엑세스토큰으로 토큰 검사 완료되면 엑세스토큰 제대로 발급받고
    const check = await tokenCheck(token, res, refreshToken);
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
    
      if(!userData) {
        // 유요한 유저 정보가 안나온다는것은 엑세스토큰,리프레쉬 토큰 인증이 안된것!
        res.status(400).json({ message: "Token has expired Please log in again"} ); 
      }else {
        const select = "select videos.id, title, videos.user_id, users.name as writer, video, thumbnail, category1, category2, category3, videos.createdAt, videos.updatedAt, count(views.video_id) as views, count(video_likes.video_id) as likes";
        let order = '';
        let having = '';
        let num = limit || 30;

        if(sort === 'views') {
          order = "order by views";
          if(cursor) {
            having = `having count(views.video_id) < ${cursor}`
          }
        }else {
          order = "order by id desc";
          if(cursor) {
            choice = {id: {[Op.lte]: [cursor]}};
            if(query2) {
              query2 = `((${query2}) and videos.id < ${cursor})`
            }else {
              query2 = `(videos.id < ${cursor})`
            }
          }
        }
  
        connection.query(`${select} from videos left join views on videos.id = views.video_id left join video_likes on videos.id = video_likes.video_id left join users on videos.user_id = users.id where video_likes.user_id = ${userData.dataValues.id} group by videos.id ${having} ${order} limit ${num}`, async function (error, results, fields) {
          const mychoice = await Promise.all(
            results.map( async (el) => {
              const isHave = await db.video_like.findOne({
                where: {
                  video_id: el.id,
                  user_id: userData.dataValues.id
                }
              })
      
              if(isHave) {
                console.log("있음")
                return true;
              }else {
                console.log("없음")
                return false;
              }
            })
          )
          const data = results.map((el, idx) => {
            el.mychoice = mychoice[idx]
            return el;
          })
          
          
          res.status(200).json({
            data: {
              myvideos: data,
              accessToken: check.token
            },
            message:"completed the inquiry"
          })
        })
      }
    }
  }
}