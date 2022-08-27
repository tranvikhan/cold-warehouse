const db = require("../models");
const Room = require("../models/room.model");
const Access = db.access;

checkCreate = (req, res, next) => {
  Access.find({ user: req.userId })
    .populate("room")
    .exec((err, result) => {
      if (err) {
        res.status(500).send({ messageError: err });
        return;
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i].room.name === req.body.name) {
          res
            .status(400)
            .send({ messageError: "Failed! Room'name is already in use!" });
          return;
        }
      }
      next();
    });
};

checkEdit = (req, res, next) => {
  if (req.body.name) {
    Access.find({ user: req.userId })
      .populate("room")
      .exec((err, result) => {
        if (err) {
          res.status(500).send({ messageError: err });
          return;
        }
        for (let i = 0; i < result.length; i++) {
          if (
            result[i].room.name === req.body.name &&
            result[i].room._id != req.body.room_id
          ) {
            res
              .status(400)
              .send({ messageError: "Failed! Room'name is already in use!" });
            return;
          }
        }
        next();
      });
  }
};

const verifyRoom = {
  checkCreate,
  checkEdit,
};

module.exports = verifyRoom;
