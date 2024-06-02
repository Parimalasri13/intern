const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
      unique: true,
    },
    password: {
      type: String,
    },
    refreshToken: String,
    favorites: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
