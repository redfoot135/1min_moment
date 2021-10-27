require("dotenv").config();

module.exports = (req, res) => {
  res.status(200).json({ message: "Logged out successfully"} );

  //데이터 베이스에 리프레시 토큰 삭제
};
