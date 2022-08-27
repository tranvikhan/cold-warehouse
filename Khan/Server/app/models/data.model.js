const mongoose = require("mongoose");

const Data = mongoose.model(
  "Data",
  new mongoose.Schema(
    {
      sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
      value: { type: Number },
      status: { type: String, default: "running" },
    },
    { timestamps: true }
  )
);
module.exports = Data;
