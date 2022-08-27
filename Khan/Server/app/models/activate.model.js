const mongoose = require("mongoose");

const Activate = mongoose.model(
  "Activate",
  new mongoose.Schema(
    {
      user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
      sensor:{type: mongoose.Schema.Types.ObjectId, ref: "Sensor"}
    },
    { timestamps: true }
  )
);
module.exports = Activate;
