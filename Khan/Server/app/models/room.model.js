const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema(
    {
      name: { type: String, require: true },
      description: { type: String, default: "" },

      size: {
        x: { type: Number, min: 1 },
        y: { type: Number, min: 1 },
        z: { type: Number, min: 1 },
      },

      sensorDensity: { type: Number, default: 10, min: 1 },

      door: {
        show: { type: Boolean, default: true },
        direction: { type: String, default: "A" },
      },
      
    },

    { timestamps: true }
  )
);

module.exports = Room;
