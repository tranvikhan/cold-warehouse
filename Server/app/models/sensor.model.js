const mongoose = require("mongoose");

const Sensor = mongoose.model(
  "Sensor",
  new mongoose.Schema(
    {
      data_id: { type: Number, require: true }, 
      datatype_id: { type: String, require: true },

      name: { type: String ,default:"Cảm biến nhiệt độ"},

      isUsed: {type: Boolean, default: false},
      
      activate: { type: mongoose.Schema.Types.ObjectId, ref: "Activate"}
    },
    { timestamps: true }
  )
);
module.exports = Sensor;
