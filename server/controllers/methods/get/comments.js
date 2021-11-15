require("dotenv").config();
const { DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME} = process.env;
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
 
  const { id, cursor } = req.query;
  const select = "select comments.id, video_id, comment, comments.createdAt, comments.updatedAt, users.name as writer"


  if(!id) {
    res.status(400).json({
      message: "파라미터 부족"
    })
  }else {
    let query = `video_id=${id}`;
    if(cursor) {
      query = `(${query}) and comments.id < ${cursor}`
    }
    // console.log(`${select} from comments left join users on comments.user_id = users.id where ${query} order by id desc limit 15`)
    connection.query(`${select} from comments left join users on comments.user_id = users.id where ${query} order by id desc limit 20`, async function (error, results, fields) {
      res.status(200).json({
        data: results,
        message: "completed the inquiry",
      })
    })
  }
}