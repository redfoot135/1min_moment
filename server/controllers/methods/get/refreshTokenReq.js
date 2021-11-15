const db = require('../../../models');
const { refreshTokenCheck } = require('../../token')

module.exports = async (req, res) => {
  if(!req.cookies || !req.cookies.refreshToken) {
    res.status(400).json({ message: "Token has expired Please log in again"} ); 
  }else {
    const { refreshToken } = req.cookies;
    const check = refreshTokenCheck(refreshToken);
    if(!check) {
      res.status(400).json({ message: "Token has expired Please log in again"} ); 
    }else {
      res.status(200).json({
          data: { accessToken: check.token },
          message: "Information passed"
      })
    }
  }
}