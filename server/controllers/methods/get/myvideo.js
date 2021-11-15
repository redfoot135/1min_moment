require("dotenv").config();
const { DATABASE_HOST, DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME} = process.env;
const db = require('../../../models');
const { tokenCheck } = require('../../token')
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
  const { authorization, refreshToken } = req.headers;
  const { cursor, sort, limit } = req.query;
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
      const select = "select videos.id, title, videos.user_id, video, thumbnail, category1, category2, category3, videos.createdAt, videos.updatedAt, count(views.video_id) as views, count(video_likes.video_id) as likes";
      let order = '';
      let having = '';
      let num = limit || 30;

      //정렬
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
      
      console.log("query =============== ", `${select} from videos left join views on videos.id = views.video_id left join video_likes on videos.id = video_likes.video_id left join users on videos.user_id = users.id where video.user_id = ${userData.dataValues.id} group by videos.id ${having} ${order} limit ${num}`)
      connection.query(`${select} from videos left join views on videos.id = views.video_id left join video_likes on videos.id = video_likes.video_id left join users on videos.user_id = users.id where videos.user_id = ${userData.dataValues.id} group by videos.id ${having} ${order} limit ${num}`, async function (error, results, fields) {
        //응답(데이터가 아무것도 없어도 빈 배열 데이터로 보내줌)
        console.log(error)
        console.log(results)
        
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