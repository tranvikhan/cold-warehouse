const mongoose = require("mongoose");

const Activate = mongoose.model(
  "Activate",
  new mongoose.Schema(
    {
      room:{type: mongoose.Schema.Types.ObjectId, ref: "Room"},
      api:{
        username: {type: String, require: true},
        password: { type: String, require: true}
      },
      
      station_id: { type: Number},
      station_name: { type: String}

    },
    { timestamps: true }
  )
);
module.exports = Activate;
