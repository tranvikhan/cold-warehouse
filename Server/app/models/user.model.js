const mongoose = require("mongoose");
const config = require("../config/auth.config");

const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      username: { type: String, require: true, unique: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },

      fullname: { type: String, default: "" },
      phone: { type: String, default: "" },
      dateOfBirth: { type: Date, default: Date.now, max: Date.now },
      gender: { type: String, default: "Male" },

      address: { type: String, default: "" },
      status: { type: String, default: "offline" },
      avatar: { type: String, default: config.baseUrl+"api/user/avatar/"+config.avatarDefault },
    },
    { timestamps: true }
  )
);

module.exports = User;
