const db = require("../models");
const result = require("../helps/result.helps");

const Room = db.room;
const Access = db.access;
const Structure = db.structure;
const Area = db.area;
const Activate = db.activate;
const Sensor = db.sensor;

/* Create -------------------------------------*/
exports.createRoom = (req, res) => {
  const newRoom = new Room({
    name: req.body.name,
    description: req.body.description,
    size: {
      x: req.body.size.x,
      y: req.body.size.y,
      z: req.body.size.z,
    },
    sensorDensity: req.body.sensorDensity,
    door: {
      direction: req.body.door.direction,
    },
  });
  newRoom.save((err, newRoom) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }

    const newAcces = new Access({
      room: newRoom._id,
      role: "Owner",
      user: req.userId,
      accepted: true,
    });

    newAcces.save((err, access) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      result.Ok(res, { room: newRoom });
    });
  });
};

/* Get Room By ID -------------------------------------*/
exports.getRoomById = (req, res) => {
  Room.findById(req.body.room_id).exec((err, room) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (room) {
      result.Ok(res, { room: room });
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};

/* Delete Room By ID -------------------------------------*/
exports.deleteRoom = (req, res) => {
  Room.deleteOne({ _id: req.body.room_id }).exec((err) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    Access.deleteMany({ room: req.body.room_id }).exec((err) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      Structure.deleteMany({ room: req.body.room_id }).exec((err) => {
        if (err) {
          result.ServerError(res, err);
          return;
        }
        Area.deleteMany({ room: req.body.room_id }).exec((err) => {
          if (err) {
            result.ServerError(res, err);
            return;
          }
          Activate.find({ room: req.body.room_id }).exec((err, activates) => {
            Sensor.deleteMany({
              activate: { $in: activates.map((at) => at._id) },
            }).exec((err) => {
              if (err) {
                result.ServerError(res, err);
                return;
              }
              Activate.deleteMany({ room: req.body.room_id }).exec((err) => {
                if (err) {
                  result.ServerError(res, err);
                  return;
                }

                req.io.to("room" + req.body.room_id).emit("room", {
                  message: "delete",
                  data: {
                    actionBy: req.userId,
                    room: { _id: req.body.room_id },
                  },
                });
                result.Ok(res, "Đã xóa kho và các thành phần liên quan");
              });
            });
          });
        });
      });
    });
  });
};

/* Edit Room By ID -------------------------------------*/
exports.editRoom = (req, res) => {
  Room.findById(req.body.room_id).exec((err, room) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (room) {
      if (req.body.name) room.name = req.body.name;

      if (req.body.description) room.description = req.body.description;

      if (req.body.size) {
        if (req.body.size.x) room.size.x = Number(req.body.size.x);
        if (req.body.size.y) room.size.y = Number(req.body.size.y);
        if (req.body.size.z) room.size.z = Number(req.body.size.z);
      }

      if (req.body.sensorDensity)
        room.sensorDensity = Number(req.body.sensorDensity);

      if (req.body.door) {
        if (req.body.door.show != null) room.door.show = req.body.door.show;
        if (req.body.door.direction)
          room.door.direction = req.body.door.direction;
      }

      room
        .save()
        .then((newRoom) => {
          req.io.to("room" + room._id).emit("room", {
            message: "edit",
            data: { actionBy: req.userId, room: newRoom },
          });
          result.Ok(res, { room: room });
        })
        .catch((err) => {
          result.ServerError(res, err);
        });
    } else {
      result.NotFound(res, "Không tìm thấy kho lạnh này");
    }
  });
};
