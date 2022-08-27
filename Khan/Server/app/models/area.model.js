const mongoose = require("mongoose");

const Area = mongoose.model(
  "Area",
  new mongoose.Schema(
    {
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      name: { type: String, require: true, default: "Khu vực cảnh báo" },

      size: {
        x0: { type: Number, require: true },
        y0: { type: Number, require: true },
        z0: { type: Number, require: true },
        x1: { type: Number, require: true },
        y1: { type: Number, require: true },
        z1: { type: Number, require: true },
      },

      temperature: {
        min: { type: Number, require: true },
        max: { type: Number, require: true },
      },

      active: { type: Boolean, default: true },
    },
    { timestamps: true }
  )
);

module.exports = Area;
