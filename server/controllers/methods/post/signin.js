const db = require('../../../models');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../../token')


module.exports = async (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    const { email, password } = req.body;
    const userInfo = await db.user.findOne({
      where: { email: email } // 이메일로만 유저 정보 조회
    })
    console.log(userInfo)
    if(!userInfo) {
      res.status(404).json({ message:"invalid email or password" })
    } else if(!userInfo.dataValues.regularMember) {
      res.status(400).json({ message: "Please proceed with the verification process"})
    } else {
        bcrypt.compare(password, userInfo.dataValues.password, function(err, result) {
          //result 암호가 없다면 에러메시지를 보내줌.
          console.log("로그인 패스워드 검증 결과 result : ", result)
          if(!result) {
            res.status(404).json({ message:"invalid email or password" })
            //result 암호가 맞다면 올바른 응답을 보내준다.
          }else {

            const payload = {
              email : userInfo.dataValues.email,
              social : userInfo.dataValues.social
            }

            const accessToken = createAccessToken(payload)
            const refreshToken = createRefreshToken(payload)
            
          // 엑세스토큰 쿠키로 보내주기
            res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
           })


           res.status(200).json({
           data: {
             email: email,
             accessToken: accessToken,
             password: password // 해싱된 비밀번호가 아닌 그냥 원본 비밀번호를 보내줌
         },
           message: "Information passed"
         })
          }
      });
  }
}