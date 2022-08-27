const mongoose = require("mongoose");

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
      status: { type: String, default: "" },
      avatar: { type: String, default: "http://localhost:8080/api/user/avatar/default.jpg" },
    },
    { timestamps: true }
  )
);

module.exports = User;
