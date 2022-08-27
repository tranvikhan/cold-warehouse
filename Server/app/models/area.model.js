const mongoose = require("mongoose");

const Area = mongoose.model(
  "Area",
  new mongoose.Schema(
    {
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      name: { type: String, require: true, default: "Khu vực giám sát" },

      size: {
        x0: { type: Number, require: true },
        y0: { type: Number, require: true },
        z0: { type: Number, require: true },
        x1: { type: Number, require: true },
        y1: { type: Number, require: true },
        z1: { type: Number, require: true },
      },

      emailOn:{ type: Boolean, default:false},
      monitorOn:{ type: Boolean, default:true},
      
      monitors:[
        {
          times:{
              from: { type: Date},
              to:{type: Date},
              
          },
          temperature: {
            min: { type: Number, require: true },
            max: { type: Number, require: true },
          },
          active: { type: Boolean, default: true }
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Area;
