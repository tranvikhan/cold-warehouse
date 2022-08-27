const mongoose = require("mongoose");

const Access = mongoose.model(
  "Access",
  new mongoose.Schema(
    {
      room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      role: { type: String, default: "Manager" },
      accepted: {type:Boolean, default: false}
    },

    { timestamps: true }
  )
);

module.exports = Access;
