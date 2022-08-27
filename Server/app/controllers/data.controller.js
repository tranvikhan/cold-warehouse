const db = require("../models");
const axios = require("axios");
const config = require("../config/data.config");
const visualData = require("./GetSensorData/visualData");
const mailler = require("../helps/mailler.help");

const xlsxFile = require("read-excel-file/node");
const interpolationArea = require("./Interpolations/MonitorInterpolation");

const Area = db.area;
const Room = db.room;
const Structure = db.structure;
const Sensor = db.sensor;
const Activate = db.activate;
const Notification = db.notification;
const Access = db.access;

global.currentData = null;

const NoiSuyBaChieu = require("./Interpolations/cubeInterpolation")
  .NoiSuyBaChieu;
const result = require("../helps/result.helps");

/* Demo Get Data (Dev Tool)-------------------------------*/
exports.getCubeData = (req, res) => {
  Room.findOne({ _id: req.body.room_id }).exec((err, room) => {
    if (err || !room) {
      result.ServerError(res, err);
      return;
    }
    Structure.findOne({ room: room._id }, "map")
      .populate({
        path: "map",
        populate: { path: "sensor" },
      })
      .sort({ createdAt: -1 })
      .exec((err, structure) => {
        if (err) {
          result.ServerError(res, err);
          return;
        }
        if (structure && global.currentData != null) {
          let data = new Array();
          let realtimeData;
          structure.map.map((st) => {
            realtimeData = global.currentData.find((sensor) => {
              return sensor.data_id === st.sensor.data_id;
            });
            if (realtimeData != null) {
              data.push({
                _id: st.sensor._id,
                x: st.location.x,
                y: st.location.y,
                z: st.location.z,
                value: realtimeData.data_value,
              });
            }
          });
          if (realtimeData != null && data.length > 0) {
            result.Ok(res, {
              cubeData: NoiSuyBaChieu([...data], room),
              time: realtimeData.data_createdDate,
            });
          } else {
            result.NotFound(res, "Không có dữ liệu");
          }
        } else {
          result.NotFound(res, "Không có dữ liệu");
        }
      });
  });
};

exports.getAreaData = (req, res) => {
  Room.findById(req.body.room_id).exec((err, room) => {
    if (err) {
      console.log(err);
      return;
    }
    if (room) {
      Structure.findOne({ room: room._id })
        .populate({
          path: "map",
          populate: { path: "sensor" },
        })
        .sort({ createdAt: -1 })
        .exec((err, structure) => {
          if (err) {
            console.log(err);
            return;
          }
          if (structure != null && global.currentData != null) {
            let data = new Array();
            let realtimeData;
            let areaThemp;
            structure.map.map((st) => {
              realtimeData = global.currentData.find((sensor) => {
                return sensor.data_id === st.sensor.data_id;
              });
              data.push({
                _id: st.sensor._id,
                datatype_id: st.sensor.datatype_id,
                data_id: st.sensor.data_id,
                x: st.location.x,
                y: st.location.y,
                z: st.location.z,
                value: realtimeData.data_value,
                status:
                  realtimeData.data_value > 99
                    ? st.sensor.isUsed
                      ? "USSING"
                      : "OFF"
                    : st.sensor.isUsed
                    ? "RUNNING"
                    : "ON",
              });
            });

            Area.find({ room: room._id }).exec((err, areas) => {
              if (err) {
                console.log(err);
                return;
              }
              if (areas != null && areas.length > 0 && data.length > 0) {
                let cubeDataCurrent = NoiSuyBaChieu([...data], room);
                areaThemp = interpolationArea.Get(cubeDataCurrent, areas);
                if (areaThemp) {
                  areaThemp = areaThemp.map((area) => ({
                    _id: area._id,
                    name: area.name,
                    value: area.average,
                  }));
                  result.Ok(res, {
                    areas: areaThemp,
                    time: realtimeData.data_createdDate,
                  });
                } else {
                  result.NotFound(res, "Không có dữ liệu");
                }
              } else {
                result.NotFound(res, "Không có dữ liệu");
              }
            });
          } else {
            result.NotFound(res, "Không có dữ liệu");
          }
        });
    } else {
      result.NotFound(res, "Không có dữ liệu");
    }
  });
};

/* Get Current Data-------------------------------------*/
exports.getCurrent = (req, res) => {
  Structure.findOne({ room: req.body.room_id }, "map")
    .populate({
      path: "map",
      populate: { path: "sensor" },
    })
    .sort({ createdAt: -1 })
    .exec((err, structure) => {
      if (err) {
        result.ServerError(res, err);
        return;
      }
      if (structure && global.currentData != null) {
        let data = new Array();
        let realtimeData;
        structure.map.map((st) => {
          realtimeData = global.currentData.find((sensor) => {
            return sensor.data_id === st.sensor.data_id;
          });
          if (realtimeData != null) {
            data.push({
              _id: st.sensor._id,
              datatype_id: st.sensor.datatype_id,
              data_id: st.sensor.data_id,
              x: st.location.x,
              y: st.location.y,
              z: st.location.z,
              value: realtimeData.data_value,
              status:
                realtimeData.data_value > 99
                  ? st.sensor.isUsed
                    ? "USSING"
                    : "OFF"
                  : st.sensor.isUsed
                  ? "RUNNING"
                  : "ON",
            });
          }
        });
        if (realtimeData != null && data.length > 0) {
          result.Ok(res, {
            room: req.body.room_id,
            datas: data,
            time: realtimeData.data_createdDate,
          });
        } else {
          result.NotFound(res, "Không có dữ liệu");
        }
      } else {
        result.NotFound(res, "Không có dữ liệu");
      }
    });
};

/* get Sensor(activated) data-------------------------------------*/
exports.getSensorData = (req, res) => {
  Activate.find({ room: req.body.room_id }).exec((err, activates) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (activates.length > 0) {
      activates.map((activate) => {
        Sensor.find({ activate: activate._id }).exec((err, sensors) => {
          if (err) {
            result.ServerError(res, err);
            return;
          }
          if (sensors) {
            if (global.currentData != null) {
              let data = new Array();
              let realtimeData;

              sensors.map((sensorX) => {
                realtimeData = global.currentData.find((sensor) => {
                  return sensor.data_id === sensorX.data_id;
                });
                data.push({
                  _id: sensorX._id,
                  datatype_id: sensorX.datatype_id,
                  data_id: sensorX.data_id,
                  value: realtimeData.data_value,
                  name: sensorX.name,
                  status:
                    realtimeData.data_value > 99
                      ? sensorX.isUsed
                        ? "USSING"
                        : "OFF"
                      : sensorX.isUsed
                      ? "RUNNING"
                      : "ON",
                });
              });
              result.Ok(res, {
                room: req.body.room_id,
                datas: data,
                time: realtimeData.data_createdDate,
              });
            } else {
              result.NotFound(res, "Không có dữ liệu");
            }
          } else {
            result.NotFound(res, "Không tìm thấy danh sách cảm biến");
          }
        });
      });
    } else {
      result.NotFound(res, "Không có dữ liệu");
    }
  });
};

/* set Realtime Data -------------------------------------*/
exports.setRealtimeData = (io) => {
  global.apiMode = config.mode;
  if (process.env.MODE_API != "fake") {
    RealData(null, null, io);
  } else {
    xlsxFile("./app/controllers/GetSensorData/Data11.xlsx").then((rows) => {
      FakeData(rows, io, 1);
    });
  }
};

/* Real Data -------------------------------------*/
const RealData = (old_activates, sensorsDB, io) => {
  if (global.activate_trigger == 1) {
    global.activate_trigger = 0;
    Activate.find().exec((err, activates) => {
      if (err) {
        console.log(err);
        return;
      }
      Sensor.find().exec((err, sensorsDB) => {
        if (err) {
          console.log(err);
          return;
        }
        if (sensorsDB) global.currentData = null;

        old_activates = activates.map((activate) => {
          let axios_rs = axios
            .post(config.real.baseURL + config.real.api.login, {
              username: activate.api.username,
              password: activate.api.password,
              grant_type: config.real.loginInfo.grant_type,
            })
            .then((user) => {
              return user.data;
            })
            .catch((err) => {
              console.log(err);
            });
          return { ...activate._doc, token: axios_rs };
        });
        RealData(old_activates, sensorsDB, io);
      });
    });
  } else {
    if (old_activates.length > 0) {
      new_activates = old_activates.map((activate) => {
        let temp = activate.token.then((user) => {
          return {
            ...user,
            sensors: axios
              .get(
                config.real.baseURL +
                  config.real.api.getValue +
                  activate.station_id,
                { headers: { Authorization: "JWT " + user.accessToken } }
              )
              .then((sensors) => {
                return sensors.data;
              }),
          };
        });
        return temp;
      });
      let a = 0;
      new_activates.map((activate) => {
        activate.then((data) => {
          data.sensors.then((sensors) => {
            save_data(sensorsDB, sensors.data, io);
            a = a + 1;
            if (a == new_activates.length) {
              RealData(old_activates, sensorsDB, io);
            }
          });
        });
      });
    } else {
      setTimeout(() => {
        RealData(old_activates, sensorsDB, io);
      }, 5000);
    }
  }
};
const save_data = (sensorsDB, sensors, io) => {
  if (global.currentDat == null) global.currentData = sensorsDB;
  global.currentData = global.currentData.map((sr) => {
    let dataCurrent = sensors.find((s) => s.data_id == sr.data_id);
    return {
      ...sr._doc,
      data_value: dataCurrent ? dataCurrent.data_value : null,
      data_createdDate: dataCurrent ? dataCurrent.data_createdDate : null,
    };
  });
  sendDataToRoom(io);
};

/* Fake Data -------------------------------------*/
const FakeData = (rows, io, index) => {
  Sensor.find().exec((err, sensorsDB) => {
    if (err) {
      console.log(err);
      return;
    }
    if (sensorsDB.length > 0) {
      var newIndex;
      if (index < (config.fake.rowsFake - 1) * 18) {
        newIndex = index + 18;
      } else {
        newIndex = 1;
      }
      //VISUAL DATA
      let data = visualData.Get(rows, index).data;
      save_data(sensorsDB, data, io);
    }
    setTimeout(() => {
      FakeData(rows, io, newIndex);
    }, 10000);
  });
};

const sendDataToRoom = (io) => {
  Room.find({}).exec((err, rooms) => {
    if (err) {
      console.log(err);
      return;
    }
    rooms.map((room) => {
      //Send sensor data to client
      Activate.find({ room: room._id }).exec((err, activates) => {
        if (err) {
          result.ServerError(res, err);
          return;
        }
        if (activates.length > 0) {
          activates.map((activate) => {
            Sensor.find({ activate: activate._id }).exec((err, sensors) => {
              if (err) {
                result.ServerError(res, err);
                return;
              }
              if (sensors) {
                if (global.currentData != null) {
                  let data = new Array();
                  let realtimeData;

                  sensors.map((sensorX) => {
                    realtimeData = global.currentData.find((sensor) => {
                      return sensor.data_id === sensorX.data_id;
                    });
                    data.push({
                      _id: sensorX._id,
                      datatype_id: sensorX.datatype_id,
                      data_id: sensorX.data_id,
                      value: realtimeData.data_value,
                      name: sensorX.name,
                      status:
                        realtimeData.data_value > 99
                          ? sensorX.isUsed
                            ? "USSING"
                            : "OFF"
                          : sensorX.isUsed
                          ? "RUNNING"
                          : "ON",
                    });
                  });
                  io.to("room" + room._id).emit("data_sensor", {
                    room: room._id,
                    datas: data,
                    time: realtimeData.data_createdDate,
                  });
                }
              }
            });
          });
        }
      });

      //Send current data (location + value) to client

      Structure.findOne({ room: room._id })
        .populate({
          path: "map",
          populate: { path: "sensor" },
        })
        .sort({ createdAt: -1 })
        .exec((err, structure) => {
          if (err) {
            console.log(err);
            return;
          }
          if (structure != null && global.currentData != null) {
            let data = new Array();
            let realtimeData = null;
            let areaThemp = null;
            let cubeDataCurrent = null;

            structure.map.map((st) => {
              realtimeData = global.currentData.find((sensor) => {
                return sensor.data_id === st.sensor.data_id;
              });
              data.push({
                _id: st.sensor._id,
                datatype_id: st.sensor.datatype_id,
                data_id: st.sensor.data_id,
                x: st.location.x,
                y: st.location.y,
                z: st.location.z,
                value: realtimeData.data_value,
                status:
                  realtimeData.data_value > 99
                    ? st.sensor.isUsed
                      ? "USSING"
                      : "OFF"
                    : st.sensor.isUsed
                    ? "RUNNING"
                    : "ON",
              });
            });
            if (realtimeData) {
              // Current data---------------------------------------------------
              io.to("room" + room._id).emit("data_room", {
                room: room._id,
                datas: data,
                time: realtimeData.data_createdDate,
              });

              // Cube data ------------------------------------------------------

              cubeDataCurrent = NoiSuyBaChieu([...data], room);
              if (cubeDataCurrent)
                io.to("room" + room._id).emit("data_cube_room", {
                  room: room._id,
                  cubeData: cubeDataCurrent,
                  time: realtimeData.data_createdDate,
                });
            }

            //Send area Data ---------------------------------------

            Area.find({ room: room._id }).exec((err, areas) => {
              if (err) {
                console.log(err);
                return;
              }
              if (
                areas != null &&
                areas.length > 0 &&
                data.length > 0 &&
                cubeDataCurrent
              ) {
                areaThemp = interpolationArea.Get(cubeDataCurrent, areas);

                if (areaThemp) {
                  //Send Area Data-----------------------------------------------------------------------
                  io.to("room" + room._id).emit("data_area", {
                    room: room._id,
                    areas: areaThemp,
                    time: realtimeData.data_createdDate,
                  });

                  //Cheack notification
                  areaThemp.map((area) => {
                    if (area.monitorOn) {
                      area.monitors.map((monitor) => {
                        let isTimeChecked = checkTime(
                          realtimeData.data_createdDate,
                          monitor.times
                        );

                        if (
                          isTimeChecked &&
                          monitor.active &&
                          (area.average < monitor.temperature.min ||
                            area.average > monitor.temperature.max)
                        ) {
                          let type =
                            area.average < monitor.temperature.min
                              ? "WARRING_LOW_TEMPERATURE"
                              : "WARRING_HIGH_TEMPERATURE";
                          Access.find(
                            { room: area.room, accepted: true },
                            { _id: 0, role: 1, room: 1, accepted: 1 }
                          )
                            .populate(
                              "user",
                              "fullname avatar _id  username email"
                            )
                            .exec((err, accesses) => {
                              if (err) {
                                return;
                              }
                              if (accesses.length > 0) {
                                accesses.map((access) => {
                                  Notification.findOne({
                                    user: access.user._id,
                                    obj_id: area._id,
                                    type: type,
                                    ref: "Area",
                                  })
                                    .sort({ createdAt: -1 })
                                    .exec((err, notification) => {
                                      if (err) {
                                        return;
                                      }
                                      if (notification) {
                                        let notificationHouse = new Date(
                                          notification.createdAt
                                        );
                                        let currentTime = new Date();
                                        if (
                                          (currentTime - notificationHouse) /
                                            1000 /
                                            60 >
                                          59
                                        ) {
                                          let newNotification = new Notification(
                                            {
                                              user: access.user._id,
                                              ref: "Area",
                                              content:
                                                "Cảnh báo nhiệt độ khu vực " +
                                                area.name +
                                                " có nhiệt độ " +
                                                Math.round(area.average * 100) /
                                                  100 +
                                                "°C",
                                              type: type,
                                              obj_id: area._id,
                                            }
                                          );
                                          newNotification
                                            .save()
                                            .then((notificationX) => {
                                              io.to("room" + area.room).emit(
                                                "notification",
                                                {
                                                  message: "add",
                                                  data: notificationX,
                                                }
                                              );
                                            });
                                          if (area.emailOn) {
                                            mailler
                                              .sendMail(
                                                access.user.email,
                                                "CẢNH BÁO NHIỆT ĐỘ",
                                                htmlData(
                                                  access.user,
                                                  room,
                                                  area,
                                                  monitor,
                                                  type
                                                )
                                              )
                                              .then()
                                              .catch((err) => {
                                                //return;
                                              });
                                          }
                                        } else {
                                          notification.content =
                                            "Cảnh báo nhiệt độ khu vực " +
                                            area.name +
                                            " có nhiệt độ " +
                                            Math.round(area.average * 100) /
                                              100 +
                                            "°C";
                                          notification.save();
                                          io.to("room" + area.room).emit(
                                            "notification",
                                            {
                                              message: "update",
                                              data: notification,
                                            }
                                          );
                                        }
                                      } else {
                                        let newNotification = new Notification({
                                          user: access.user._id,
                                          ref: "Area",
                                          content:
                                            "Cảnh báo nhiệt độ khu vực " +
                                            area.name +
                                            " có nhiệt độ " +
                                            Math.round(area.average * 100) /
                                              100 +
                                            "°C",
                                          type: type,
                                          obj_id: area._id,
                                        });
                                        newNotification
                                          .save()
                                          .then((notificationX) => {
                                            io.to("room" + area.room).emit(
                                              "notification",
                                              {
                                                message: "add",
                                                data: notificationX,
                                              }
                                            );
                                            if (area.emailOn) {
                                              mailler
                                                .sendMail(
                                                  access.user.email,
                                                  "CẢNH BÁO NHIỆT ĐỘ",
                                                  htmlData(
                                                    access.user,
                                                    room,
                                                    area,
                                                    monitor,
                                                    type
                                                  )
                                                )
                                                .then()
                                                .catch((err) => {
                                                  return;
                                                });
                                            }
                                          });
                                      }
                                    });
                                });
                              }
                            });
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        });
    });
  });
};

const checkTime = (strCurrentTime, monitorTime) => {
  let currentTime = new Date(strCurrentTime);
  let fromTime = new Date(monitorTime.from);
  let toTime = new Date(monitorTime.to);
  let numCurrentTime = currentTime.getHours() * 60 + currentTime.getMinutes();
  let numfromTime = fromTime.getHours() * 60 + fromTime.getMinutes();
  let numtoTime = toTime.getHours() * 60 + toTime.getMinutes();
  return numCurrentTime >= numfromTime && numCurrentTime <= numtoTime
    ? true
    : false;
};

const htmlData = (user, room, area, monitor, type) => {
  let noti =
    type == "WARRING_HIGH_TEMPERATURE"
      ? `<span style="color: rgb(226, 80, 65);"><strong>Cao hơn </strong></span>`
      : `<span style="color: rgb(41, 105, 176);"><strong>Thấp hơn</strong></span>`;
  let abs =
    type == "WARRING_HIGH_TEMPERATURE"
      ? area.average - monitor.temperature.max
      : area.average - monitor.temperature.min;
  let nowtime = new Date();
  let strtime = nowtime.toUTCString();
  /* return (
    `<h3>Xin ch&agrave;o, <strong>` +
    user.fullname +
    `</strong></h3>
  <p><strong>Kho lạnh:</strong> ` +
    room.name +
    `</p>
  <p><strong>Khu vực:</strong> ` +
    area.name +
    `</p><p><span style="color: rgb(41, 105, 176);">
  <em>Đang c&oacute; nhiệt độ ngo&agrave;i ngưỡng cho ph&eacute;p.</em>
  </span></p><p><strong>Nhiệt độ cho ph&eacute;p từ:</strong> ` +
    monitor.temperature.min +
    ` <span style="color: rgb(32, 33, 36); font-family: arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">&deg;C</span>&nbsp;
   đến &nbsp;` +
    monitor.temperature.max +
    ` <span style="color: rgb(32, 33, 36); font-family: arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">&deg;C</span>&nbsp;</p>
   <p><strong>Nhiệt độ cảnh b&aacute;o:</strong> ` +
    area.average +
    ` <span style="color: rgb(32, 33, 36); font-family: arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">&deg;C</span> , 
   ` +
    noti +
    `
   : 
   ` +
    Math.round(abs * 100) / 100 +
    ` <span style="color: rgb(32, 33, 36); font-family: arial, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">&deg;C</span>&nbsp;</p>
   <p>Dấu thời gian:&nbsp;` +
    strtime +
    `</p>
   <p><em>Vui l&ograve;ng điều chỉnh nhiệt độ kho lạnh của bạn hoặc tắt chế độ gi&aacute;m s&aacute;t để bỏ qua c&aacute;c email tiếp theo, xin cảm ơn</em></p><p><br></p><p><br></p><p><br></p><h3><br></h3>`
  ); */

  return `<p>&nbsp;</p>
  <div style="margin: 0; background-color: #f4f8f9;">
  <table style="font-family: Arial,Helvetica,sans-serif; font-size: 13px; color: #706f6f; line-height: 140%; width: 100%; background-color: #f4f8f9;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td>
  <table style="width: 524px;" border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td colspan="3" valign="bottom"><img class="CToWUd" style="vertical-align: bottom;" src="https://123host.vn/wp-content/uploads/email-top.jpg" alt="" width="524" height="24" /></td>
  </tr>
  <tr>
  <td width="524">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f5f6f8 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f5f6f8 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f3f4f6 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #f0f1f3 solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #ecedef solid 1px; border-left: #f4f8f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #e6e7e9 solid 1px; border-left: #f6f7f9 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #e1e2e4 solid 1px; border-left: #f5f6f8 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #dadbdd solid 1px; border-left: #f3f7f8 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #d2d6d7 solid 1px; border-left: #f1f5f6 solid 1px;">
  <table border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="border-right: #d2d3d5 solid 1px; border-left: #f0f1f3 solid 1px;">
  <table style="width: 504px;" border="0" cellspacing="0" cellpadding="0" align="center">
  <tbody>
  <tr>
  <td style="background-color: #ffffff;" valign="top" width="506">
  <table style="width: 504px;" border="0" cellspacing="0" cellpadding="0" align="left">
  <tbody>
  <tr>
  <td style="padding: 20px 0px; border-bottom: 3px solid #b6c2af; width: 172px;" align="center">
  <h1 style="border-right: #dedede solid 2px; margin: 0;"><img src="https://i.ibb.co/Ld2nm5z/icon.png" alt="" width="80" height="80" /></h1>
  </td>
  <td style="padding: 20px 0px; border-bottom: 3px solid #b6c2af; width: 326px;" align="center">
  <h3 style="margin: 0; color: #63bd68; font-weight: normal;"><span style="color: #2c3e50;"><strong>QUẢN L&Yacute; NHIỆT ĐỘ KHO LẠNH</strong></span></h3>
  </td>
  </tr>
  <tr>
  <td style="padding: 35px 30px 10px; background-color: #2c3e50; width: 440px;" colspan="2" valign="top">
  <p><span style="color: #ffffff;">K&iacute;nh ch&agrave;o <strong>${
    user.fullname
  }</strong>,</span><br /><br /><span style="color: #ffffff;">Kho lạnh: <strong> ${
    room.name
  }</strong></span></p>
  <p><span style="color: #ffffff;">Khu vực:<strong> ${
    area.name
  }</strong></span></p>
  <h3><span style="color: #f1c40f;"><strong>C&Oacute; NHIỆT ĐỘ NGO&Agrave;I NGƯỠNG CHO PH&Eacute;P</strong></span></h3>
  <p>&nbsp;</p>
  <p><span style="color: #ffffff;">Nhiệt độ cảnh b&aacute;o: <strong>${
    area.average
  } &deg;C</strong> , ${noti}: <strong>${
    Math.round(abs * 100) / 100
  } &deg;C&nbsp;</strong></span></p>
  <p><span style="color: #ffffff;">Nhiệt độ cho ph&eacute;p từ: <strong>${
    monitor.temperature.min
  } &deg;C</strong>&nbsp; đến &nbsp;<strong>${
    monitor.temperature.max
  } &deg;C</strong>&nbsp;</span></p>
  <p><span style="color: #ffffff;">Dấu thời gian:&nbsp;${strtime}</span></p>
  <br /><span style="color: #ffffff;">Th&ocirc;ng tin c&aacute;c k&ecirc;nh hỗ trợ vui l&ograve;ng tham khảo tại <a style="color: #ffffff;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener">http://nqtoan.herokuapp.com/</a></span><br /><br /><span style="color: #ffffff;">Ch&acirc;n th&agrave;nh cảm ơn v&agrave; k&iacute;nh ch&agrave;o.</span></td>
  </tr>
  <tr>
  <td style="padding: 10px 0px 5px; width: 500px;" colspan="2" valign="middle">
  <table border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr>
  <td width="140">&nbsp;</td>
  <td valign="middle" width="15" height="26"><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/facebook-icon-40x40.png" height="40" /></a></td>
  <td width="10">&nbsp;</td>
  <td><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/twitter-icon-40x40.png" height="40" /></a></td>
  <td width="10">&nbsp;</td>
  <td valign="middle" height="26"><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/icon-youtube40x40.png" height="40" /></a></td>
  <td width="10">&nbsp;</td>
  <td><a style="color: #706f6f; text-decoration: none;" href="http://nqtoan.herokuapp.com/" target="_blank" rel="noopener"><img class="CToWUd" style="border: 0; vertical-align: middle;" src="https://123host.vn/wp-content/uploads/googleplus40x40.png" height="40" /></a></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr>
  <td colspan="3" valign="top"><img class="CToWUd" style="vertical-align: top;" src="https://123host.vn/wp-content/uploads/email-but.jpg" alt="" width="524" height="24" /></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <tr>
  <td style="color: #9b9b9b; font-size: 11px; padding: 10px 0 20px;" align="center" valign="middle">Copyright &copy; Warehouse Temperature</td>
  </tr>
  </tbody>
  </table>
  <div class="yj6qo">&nbsp;</div>
  <div class="adL">&nbsp;</div>
  </div>`;
};
