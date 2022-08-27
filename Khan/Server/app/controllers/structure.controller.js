const db = require("../models");
const Structure = db.structure;
const Sensor = db.sensor;
const result = require("../helps/result.helps");

/* Get -------------------------------------*/
exports.getStructure = (req, res) => {
  Structure.findOne({ room: req.body.room_id }, { _id: 0, room: 0 })
    .populate({
      path: "map",
      populate: { path: "sensor", select: "name _id deviceId" },
    })
    .sort({ createdAt: -1 })
    .exec((err, structure) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      if (structure) {
        result.Ok(res, { structure: structure });
      } else {
        result.Ok(res, { structure: [] });
      }
    });
};

/* Add Sensor -------------------------------------*/
exports.addStructureSensor = (req, res) => {
  Structure.findOne({ room: req.body.room_id })
    .sort({ createdAt: -1 })
    .exec((err, Oldstructure) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      Sensor.findById(req.body.sensor_id).exec((err, sensor) => {
        if (err) {
          result.ServerError(res, err);
          return;
        }
        if (sensor) {
          if (sensor.isUsed) {
            return result.NotFound(res, "Cảm biến đang được sử dụng");
          } else {
            let newStructure = new Structure();
            newStructure.room = req.body.room_id;
            if (Oldstructure) {
              newStructure.map = [...Oldstructure.map];
            } else {
              newStructure.map = new Array();
            }
            newStructure.map.push({
              sensor: req.body.sensor_id,
              location: {
                x: req.body.location.x,
                y: req.body.location.y,
                z: req.body.location.z,
              },
            });
            newStructure
              .save()
              .then(() => {
                sensor.isUsed = true;
                sensor
                  .save()
                  .then(() => {
                    Structure.findOne(
                      { room: req.body.room_id },
                      { _id: 0, room: 0 }
                    )
                      .populate({
                        path: "map",
                        populate: {
                          path: "sensor",
                          select: "name _id deviceId",
                        },
                      })
                      .sort({ createdAt: -1 })
                      .exec((err, Zstructure) => {
                        if (err) {
                          result.ServerError(res, err);
                          return;
                        }
                        if (Zstructure) {
                          req.io
                            .to("room" + req.body.room_id)
                            .emit("structure", {
                              message: "add",
                              data: {
                                actionBy: req.userId,
                                room: { _id: req.body.room_id },
                                structure: Zstructure,
                              },
                            });
                          result.Ok(res, { structure: Zstructure });
                        }
                      });
                  })
                  .catch((err) => {
                    result.ServerError(res, err);
                  });
              })
              .catch((err) => {
                result.ServerError(res, err);
              });
          }
        } else {
          return result.NotFound(res, "Sai id cảm biến");
        }
      });
    });
};

//edit Structure
exports.editStructureSensor = (req, res) => {
  Structure.findOne({ room: req.body.room_id })
    .sort({ createdAt: -1 })
    .exec((err, Oldstructure) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      Sensor.findById(req.body.sensor_id).exec((err, sensor) => {
        if (err) {
          result.ServerError(res, err);
          return;
        }
        if (sensor) {
          if (!sensor.isUsed) {
            return result.NotFound(res, "Cảm biến chưa đuợc sử dụng");
          } else {
            let newStructure = new Structure();
            newStructure.room = req.body.room_id;
            if (Oldstructure) {
              newStructure.map = [...Oldstructure.map];
            } else {
              newStructure.map = new Array();
            }

            newStructure.map = newStructure.map.filter(
              (st) => st.sensor != req.body.sensor_id
            );
            newStructure.map.push({
              sensor: req.body.sensor_id,
              location: {
                x: req.body.location.x,
                y: req.body.location.y,
                z: req.body.location.z,
              },
            });
            newStructure
              .save()
              .then(() => {
                Structure.findOne(
                  { room: req.body.room_id },
                  { _id: 0, room: 0 }
                )
                  .populate({
                    path: "map",
                    populate: { path: "sensor", select: "name _id deviceId" },
                  })
                  .sort({ createdAt: -1 })
                  .exec((err, Zstructure) => {
                    if (err) {
                      result.ServerError(res, err);
                      return;
                    }
                    if (Zstructure) {
                      req.io.to("room" + req.body.room_id).emit("structure", {
                        message: "update",
                        data: {
                          actionBy: req.userId,
                          room: { _id: req.body.room_id },
                          structure: Zstructure,
                        },
                      });
                      result.Ok(res, { structure: Zstructure });
                    }
                  });
              })
              .catch((err) => {
                result.ServerError(res, err);
              });
          }
        } else {
          return result.NotFound(res, "Sai id cảm biến");
        }
      });
    });
};

//delete Structure
exports.deleteStructureSensor = (req, res) => {
  Structure.findOne({ room: req.body.room_id })
    .sort({ createdAt: -1 })
    .exec((err, Oldstructure) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      Sensor.findById(req.body.sensor_id).exec((err, sensor) => {
        if (err) {
          result.ServerError(res, err);
          return;
        }
        if (sensor) {
          if (!sensor.isUsed) {
            return result.NotFound(res, "Cảm biến chưa đuợc sử dụng");
          } else {
            let newStructure = new Structure();
            newStructure.room = req.body.room_id;
            if (Oldstructure) {
              newStructure.map = [...Oldstructure.map];
            } else {
              newStructure.map = new Array();
            }
            newStructure.map = newStructure.map.filter(
              (st) => st.sensor != req.body.sensor_id
            );
            newStructure
              .save()
              .then(() => {
                sensor.isUsed = false;
                sensor.save().then(() => {
                  Structure.findOne(
                    { room: req.body.room_id },
                    { _id: 0, room: 0 }
                  )
                    .populate({
                      path: "map",
                      populate: { path: "sensor", select: "name _id deviceId" },
                    })
                    .sort({ createdAt: -1 })
                    .exec((err, Zstructure) => {
                      if (err) {
                        result.ServerError(res, err);
                        return;
                      }
                      if (Zstructure) {
                        req.io.to("room" + req.body.room_id).emit("structure", {
                          message: "delete",
                          data: {
                            actionBy: req.userId,
                            room: { _id: req.body.room_id },
                            structure: Zstructure,
                          },
                        });
                        result.Ok(res, { structure: Zstructure });
                      }
                    });
                });
              })
              .catch((err) => {
                result.ServerError(res, err);
              });
          }
        } else {
          return result.NotFound(res, "Sai id cảm biến");
        }
      });
    });
};

//te Structure
exports.swapStructureSensor = (req, res) => {
  result.NotFound(res, "Chưa làm vụ này");
};
