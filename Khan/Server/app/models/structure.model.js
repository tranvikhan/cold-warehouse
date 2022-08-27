const mongoose = require("mongoose");

const Structure = mongoose.model(
  "Structure",
  new mongoose.Schema(
    {
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      map:[

        {
          sensor: { type: mongoose.Schema.Types.ObjectId, ref: "Sensor" },
          location: {
            x: { type: Number, require: true},
            y: { type: Number, require: true},
            z: { type: Number, require: true},
          }
        }

      ],
    },
    { timestamps: true }
  )
);


module.exports = Structure;
