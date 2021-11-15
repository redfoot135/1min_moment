module.exports = (req, res) => {
  res.cookie("refreshToken", null, {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })

  res.status(200).json({ message: "Logged out successfully"} );
};
