const db = require("../models");
const Sensor = db.sensor;
const Activate = db.activate;
const Structure = db.structure;
const result = require("../helps/result.helps");
const axios = require("axios");
const config = require("../config/data.config");

//Get All Activate of Room
exports.getAllActivate = (req, res) => {
  Activate.find(
    { room: req.body.room_id },
    "api _id station_id station_name createdAt"
  ).exec((err, activates) => {
    if (err) {
      result.ServerError(res, err);
    }
    result.Ok(res, { activates: activates });
  });
};

// Activate
exports.Activate = (req, res) => {
  let loginInfo = {
    username: req.body.username,
    password: req.body.password,
    grant_type: config.real.loginInfo.grant_type,
  };
  axios
    .post(config.real.baseURL + config.real.api.login, loginInfo)
    .then((user) => {
      axios
        .get(
          config.real.baseURL + config.real.api.getStation + user.data.user_id,
          { headers: { Authorization: "JWT " + user.data.accessToken } }
        )
        .then((station) => {
          if (station.data.data.length > 0) {
            let stations = station.data.data.map((stationX) => ({
              station_id: stationX.station_id,
              station_name: stationX.station_name,
            }));
            result.Ok(res, { stations: stations });
          } else {
            result.NotFound(res, "Không tồn tại kho lạnh nào");
          }
        })
        .catch((err) => {
          result.ServerError(res, "Tài khoản này không được kích hoạt kho nào");
        });
    })
    .catch((err) => {
      result.ServerError(res, "Tài khoản này không đúng");
    });
};

exports.addActivate = (req, res) => {
  let loginInfo = {
    username: req.body.username,
    password: req.body.password,
    grant_type: config.real.loginInfo.grant_type,
  };
  axios
    .post(config.real.baseURL + config.real.api.login, loginInfo)
    .then((user) => {
      Activate.findOne({
        room: req.body.room_id,
        station_id: req.body.station_id,
      }).exec((err, activate) => {
        if (err) {
          result.ServerError(res, err);
        }
        if (!activate) {
          axios
            .get(
              config.real.baseURL +
                config.real.api.getValue +
                req.body.station_id,
              { headers: { Authorization: "JWT " + user.data.accessToken } }
            )
            .then((sensors) => {
              if (sensors.data.data.length > 0) {
                let newActivate = new Activate({
                  room: req.body.room_id,
                  api: {
                    username: req.body.username,
                    password: req.body.password,
                  },
                  station_id: req.body.station_id,
                  station_name: req.body.station_name,
                });
                newActivate
                  .save()
                  .then((newActivate) => {
                    sensors.data.data.map((sensor) => {
                      let newSensor = new Sensor({
                        data_id: sensor.data_id,
                        datatype_id: sensor.datatype_id,
                        name: "Cảm biến nhiệt độ " + sensor.datatype_id,
                        isUsed: false,
                        activate: newActivate._id,
                      });
                      newSensor.save();
                    });
                    global.activate_trigger = 1;
                    req.io.to("room" + req.body.room_id).emit("activate", {
                      message: "add",
                      data: {
                        actionBy: req.userId,
                        room: { _id: req.body.room_id },
                        activate: {
                          ...newActivate._doc,
                          sensors: sensors.data.data.length,
                        },
                      },
                    });
                    result.Ok(res, {
                      activate: {
                        ...newActivate._doc,
                        sensors: sensors.data.data.length,
                      },
                    });
                  })
                  .catch((err) => {
                    return result.ServerError(res, "Lỗi khởi tạo khóa api mới");
                  });
              } else {
                result.NotFound(res, "Không có cảm biến nào");
              }
            })
            .catch((err) => {
              result.ServerError(
                res,
                "Tài khoản này không được kích hoạt kho nào"
              );
            });
        } else {
          result.BadRequest(res, "API kho lạnh này đã được thêm");
        }
      });
    })
    .catch((err) => {
      result.ServerError(res, "Tài khoản này không đúng");
    });
};

//Delete activate
exports.removeActivate = (req, res) => {
  Structure.findOne({ room: req.body.room_id })
    .sort({ createdAt: -1 })
    .exec((err, Oldstructure) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      console.log("Buoc 1", Oldstructure);

      Activate.find({ room: req.body.room_id, _id: req.body.activate_id }).exec(
        (err, activatesOld) => {
          if (err) {
            return result.ServerError(res, err);
          }
          if (activatesOld) {
            let activates = [...activatesOld];
            console.log("Buoc 2", activates);
            Sensor.find({
              activate: { $in: [...activates].map((at) => at._id) },
              isUsed: true,
            }).exec((err, sensors) => {
              if (err) {
                result.ServerError(res, err);
                return;
              }
              console.log("Buoc 3", sensors);
              if (sensors) {
                let newStructure = new Structure();
                newStructure.room = req.body.room_id;
                if (Oldstructure) {
                  newStructure.map = [...Oldstructure.map];
                } else {
                  newStructure.map = new Array();
                }

                newStructure.map = newStructure.map.filter((st) => {
                  return (
                    sensors.find((sr) => sr._id + "" == st.sensor + "") == null
                  );
                });

                newStructure
                  .save()
                  .then(() => {
                    if (activates) {
                      Sensor.deleteMany({
                        activate: { $in: [...activates].map((at) => at._id) },
                      }).exec((err) => {
                        if (err) {
                          result.ServerError(res, err);
                          return;
                        }
                        req.io.to("room" + req.body.room_id).emit("activate", {
                          message: "delete",
                          data: {
                            actionBy: req.userId,
                            room: { _id: req.body.room_id },
                            activate: {
                              _id: req.body.activate_id,
                            },
                          },
                        });
                        console.log("Buoc 4", activates);
                        Activate.deleteMany({
                          room: req.body.room_id,
                          _id: req.body.activate_id,
                        }).exec((err) => {
                          if (err) {
                            return result.ServerError(res, err);
                          }
                          global.activate_trigger = 1;
                          result.Ok(res, "Đã gỡ bỏ api");
                        });
                      });
                    } else {
                      return result.NotFound(res, "Lỗi");
                    }
                  })
                  .catch((err) => {
                    result.ServerError(res, err);
                  });
              } else {
                return result.NotFound(res, "Lỗi");
              }
            });
          } else {
            return result.NotFound(res, "Lỗi");
          }
        }
      );
    });
};
