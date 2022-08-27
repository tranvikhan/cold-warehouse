const mongoose = require("mongoose");

const Nontification = mongoose.model(
  "Nontification",
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
module.exports = Nontification;
