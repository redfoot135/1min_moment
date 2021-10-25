require("dotenv").config();
const db = require('../../../models');
const jwt = require('jsonwebtoken');
const { createAccessToken, createRefreshToken } = require('../../token')

module.exports = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = String(Math.random());
  if(!name || !email || !password ) {
    res.status(422).json({ message:"insufficient parameters supplied"} )
  }else {
    await db.user.findOrCreate({
      where: {
        email: req.body.email
      },
      defaults: {
        email: email,
        name: name,
        password: jwt.sign(password, salt),
        salt: salt
      }
    })
    .then(([data, created]) => {
      if(!created) {
        res.status(409).json({ message: "This email already exists"})
      }else{
        
        const payload = {
          id: data.dataValues.id,
          name: data.dataValues.name,
          email: data.dataValues.email,
          password: data.dataValues.password
        }

  
        const accessToken = createAccessToken(payload);
        const refreshToken = createRefreshToken(payload);
        
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none"
        })
  
        res.status(201).json({
            data : { 
              accessToken: accessToken,
              name: data.dataValues.name,
              email: data.dataValues.email,
              password: data.dataValues.password
            },
            message: "You have become a member"
          })
      }
    })
  }
}