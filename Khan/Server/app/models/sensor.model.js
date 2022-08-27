const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema(
    {
      deviceId: { type: String, require: true },
      name: { type: String ,default:"Cảm biến nhiệt độ"},
      activateKey: { type: String, require: true },
      activated: {type: Boolean, default: false}
    },
    { timestamps: true }
  )
);
module.exports = Sensor;
