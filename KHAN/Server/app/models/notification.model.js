const mongoose = require("mongoose");

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

      content: { type: String},
      type: { type: String },
      
      ref:{ type: String},
      obj_id: {type: mongoose.Schema.Types.ObjectId},
      
    },
    { timestamps: true }
  )
);
module.exports = Notification;
