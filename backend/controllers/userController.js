require("dotenv").config();

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/genToken");

//create user
const registerUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "Require all fields!!" });
  }
  //check if user already exists
  const findUser = await User.findOne({ name });
  if (findUser) {
    return res.status(400).json({ message: "User already exists!!" });
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    name,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

//authenticate user
const loginUser = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "Require all fields!!" });
  }
  //check if user doesnt exists
  const user = await User.findOne({ name });
  if (!user) {
    return res.status(400).json({ message: "User doesnt exists!!" });
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const tokens = generateToken(user.name);
    // Saving refreshToken with current user
    user.refreshToken = tokens.refreshToken;
    await user.save();
    res.cookie("jwt", tokens.refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      name: user.name,
      accessToken: tokens.accessToken,
    });
  } else {
    res.status(400).json({ message: "Invalid user credentials" });
  }
};

//update password
const updatePassword = async (req, res) => {
  const { name, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    ///hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password has been updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password" });
  }
};

//refresh the token
const refreshUserToken = async (req, res) => {
  const cookies = req.cookies;
  //check if cookie exists
  if (cookies?.jwt) {
    // Destructuring refreshToken from cookie
    const refreshToken = cookies.jwt;
    // Verifying refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        // Wrong Refesh Token
        return res.status(406).json({ message: "Unauthorized" });
      } else {
        // Correct token we send a new access token
        const accessToken = generateToken(decoded.name).accessToken;
        return res.json({ accessToken, name: decoded.name });
      }
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
};

//logout the user
const logoutUser = async (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

//get favorites
const getFavorites = async (req, res) => {
  try {
    return res.status(200).json(req.user.favorites);
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    return res.status(500).json({ message: "Error retrieving favorites" });
  }
};

//add to favorites
const addToFavorites = async (req, res) => {
  const { movieId } = req.body;
  if (!movieId) {
    return res.status(400).json({ message: "movieId required!" });
  }
  const name = req.user.name;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.favorites.includes(movieId)) {
      return res.status(409).json({ message: "movieId already in favorites" });
    }
    user.favorites.push(movieId);
    await user.save();
    return res.status(201).json({ message: "Added successfully!" });
  } catch (error) {
    console.error("Error adding movie to favorites:", error);
    return res.status(500).json({ message: "Error adding movie to favorites" });
  }
};

//remove favorites
const removeFromFavorites = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "movieId required!" });
  }
  const name = req.user.name;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.favorites = user.favorites.filter((movieId) => movieId !== id);
    await user.save();
    return res.status(200).json({ message: "Removed successfully!" });
  } catch (error) {
    console.error("Error removing movie from favorites:", error);
    return res
      .status(500)
      .json({ message: "Error removing movie from favorites" });
  }
};

module.exports = {
  refreshUserToken,
  updatePassword,
  loginUser,
  registerUser,
  logoutUser,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
};
