require("dotenv").config();
const jwt = require('jsonwebtoken');
const refresh_secret = process.env.REFRESH_SECRET;
const db = require('../../../models');

module.exports = async (req, res) => {
  const token = req.query.token;
  jwt.verify(token,refresh_secret, (err,decoded) => {
    if(err) {
      res.send('인증시간이 만료되었습니다. 다시 회원가입 해주세요.')
    }else {
      const email = decoded.email;
      db.user.findOne({where: {email: email}})
      .then((data) => {
        if(!data || token !== data.authToken) {
          res.send("잘못된 정보입니다");
        }else {
          db.user.update({refreshToken: null, regularMember: true}, {
            where: {
              email: email
            }
          })
          res.send("1분미만 회원가입이 완료되었습니다");         
        }
      })
    }
  })
}
  