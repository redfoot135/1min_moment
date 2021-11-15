require("dotenv").config();
const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME} = process.env;
const db = require('../../../models');
const { Op, fn, col } = require('sequelize');
const sequelize = require('sequelize');
const mysql = require('mysql');
const { tokenCheck } = require('../../token')
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : DATABASE_USERNAME,
  password : DATABASE_PASSWORD,
  database : DATABASE_NAME
});
connection.connect();

module.exports = async (req, res) => {
  console.log('querrrrry',req.query)
  const { authorization, refreshToken } = req.headers;
  let id;
  if(authorization) {
    const token = authorization.split(' ')[1];
    const check = await tokenCheck(token, res, refreshToken);
    if(check) {
      const search = {};
      if(check.email) {
        search.email = check.email
      }else {
        search.social = check.social
      }
      const userData = await db.user.findOne({
        where: search
      })
      id = userData.dataValues.id
    }
  }
  const { search, cursor, sort, limit } = req.query;
  console.log(req.query)
  const select = "select videos.id, title, users.name as writer, video, thumbnail, category1, category2, category3, videos.createdAt, videos.updatedAt, count(views.video_id) as views, count(video_likes.video_id) as likes"
  let order = '';
  let query = {};
  let query2 = '';
  let choice = '';
  let having;
  let having2 = '';
  let num = limit || 30;

  if(req.query.category) {
    const category = req.query.category.split("/");
    //쿼리 작성 if문
    if(category.length === 3) {
      query2 = `(category1 in ("${category[0]}", "${category[1]}", "${category[2]}")) AND (category2 in ("${category[0]}", "${category[1]}", "${category[2]}")) OR (category3 in ("${category[0]}", "${category[1]}", "${category[2]}"))`
      query = 
      {
        [Op.and]: 
        {
          category1: { [Op.or]: category}, category2: {[Op.or]: category},category3: {[Op.or]: category}
        }
      }
    }else if(category.length === 2) {
      query2 = `(((category1 = "${category[0]}" OR category1 = "${category[1]}") AND (category2 = "${category[0]}" OR category2 = "${category[1]}")) OR ((category1 = "${category[0]}" OR category1 = "${category[1]}") AND (category3 = "${category[0]}" OR category3 = "${category[1]}")) OR ((category2 = "${category[0]}" OR category2 = "${category[1]}") AND (category3 = "${category[0]}" OR category3 = "${category[1]}")))`
      query = 
      {
        [Op.or]: 
        [
          { [Op.and]: {category1: {[Op.or]: category}, category2: {[Op.or]: category}}},
          { [Op.and]: {category1: {[Op.or]: category}, category3: {[Op.or]: category}}},
          { [Op.and]: {category2: {[Op.or]: category}, category3: {[Op.or]: category}}}
        ]
      }
    }else if(category.length === 1) {
      query2 = `(category1 IN ('${category[0]}') OR category2 IN ('${category[0]}') OR category3 IN ('${category[0]}'))`
      query = 
      {
        //[Op.or]: [{category1: category , category2: category, category3: category },{id : {[Op.between]: [cursor,cursor+10]}}],
        //{[Op.gt]:cursor}}],
        [Op.or]: {category1: category , category2: category, category3: category },
      }
    }
  }
 
  //검색어 찾기
  if(search) {
    query.title = {[Op.like]: "%" + search + "%"}
    if(query2) {
      query2 = `((${query2}) and title like "%${search}%")`
    }else {
      query2 = `title like "%${search}%"`
    }
  }

  //정렬
  if(sort === 'views') {
    order = "order by views";
    if(cursor) {
      having = sequelize.literal(`COUNT(views.video_id) <= ${cursor}`);
      having2 = `having count(views.video_id) < ${cursor}`
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
  
  if(query2) {
    query2 = `where ` + query2
  }

  console.log("query2============= ",query2)
  
  
  // const userdata = await db.video.findAll(
  //   {
  //     attributes: ["id","title", "user_id", "video", "thumbnail", "category1", "category2", "category3", "createdAt", "updatedAt", [sequelize.fn('count', sequelize.col('views.video_id')), 'video_views']],
  //     where: [query, choice], 
  //     include: [{ 
  //       model: db.views,
  //       attributes: [],
  //       required: false
  //     }],
  //     distinct: true,
  //     // limit: 3,
  //     order: sequelize.fn('count', sequelize.col('views.video_id')),
  //     having: having ,
  //     group: ["video.id"],
  //   }
  //   ); 

    console.log("query ============= ", `${select} from videos left join views on videos.id = views.video_id left join video_likes on videos.id = video_likes.video_id left join users on videos.user_id = users.id ${query2} group by videos.id ${having2} ${order} limit ${num}`)
    connection.query(`${select} from videos left join views on videos.id = views.video_id left join video_likes on videos.id = video_likes.video_id left join users on videos.user_id = users.id ${query2} group by videos.id ${having2} ${order} limit ${num}`, async function (error, results, fields) {
      if (error) {
          console.log(error);
      } else{
        const mychoice = await Promise.all(
          results.map( async (el) => {
            if(id) {
              const isHave = await db.video_like.findOne({
                where: {
                  video_id: el.id,
                  user_id: id
                }
              })
      
              if(isHave) {
                console.log("있음")
                return true;
              }else {
                console.log("없음")
                return false;
              }
            }else {
              return false;
            }
          })
        )
        const data = results.map((el, idx) => {
          el.mychoice = mychoice[idx]
          return el;
        })
  
        console.log(mychoice)
  
        res.json({
          data: data,
          message: "completed the inquiry",
        })

      }

    });
  }