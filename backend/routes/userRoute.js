const express = require("express");
const {
  loginUser,
  registerUser,
  refreshUserToken,
  logoutUser,
  updatePassword,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} = require("../controllers/userController");
const { handleUser } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.put("/update-password", updatePassword);
userRouter.get("/refresh", refreshUserToken);
userRouter.get("/logout", logoutUser);
userRouter.get("/favorites", handleUser, getFavorites);
userRouter.post("/add-to-favorites", handleUser, addToFavorites);
userRouter.delete(
  "/remove-from-favorites/:id",
  handleUser,
  removeFromFavorites
);

module.exports = userRouter;
