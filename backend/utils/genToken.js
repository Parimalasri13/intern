require("dotenv").config();

const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (name) => {
  const accessToken = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ name }, process.env.REFRESH_SECRET, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
};

module.exports = { generateToken };
