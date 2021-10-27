require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken } = require('../../token')


module.exports = async (req, res) => {
    
    const userInfo = await db.user.findOne({
      where: { email: req.body.email } // 이메일로만 유저 정보 조회
    })

    if(!userInfo) {
      res.status(404).json({ message:"invalid email or password" })
    } else {
      const inputpassword = jwt.sign(req.body.password, userInfo.dataValues.salt)

      if(userInfo.dataValues.password !== inputpassword) {
        res.status(404).json({ message:"invalid email or password" })
      }else {

        const payload = {
          id : userInfo.dataValues.id,
          name : userInfo.dataValues.name,
          email : userInfo.dataValues.email,
          password: userInfo.dataValues.password, // 여기는 이미 회원가입할때 해싱을 해버린 패스워드임
        }

        const accessToken = createAccessToken(payload)
        const refreshToken = createRefreshToken(payload)

         
        // 리프레쉬 토큰 db에 저장하기
        db.user.update({
          refreshToken: refreshToken
        }, {
          where: { email: req.body.email }
        })

              
      // 엑세스토큰 쿠키로 보내주기
        res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      }


      res.status(200).json({
      data: {
        email:userInfo.dataValues.email,
        password: req.body.password // 해싱된 비밀번호가 아닌 그냥 원본 비밀번호를 보내줌
    },
      message: "Information passed"
    })



    }

  
}