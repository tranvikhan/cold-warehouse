const db = require("../models");

const Area = db.area;
const result = require("../helps/result.helps");
const e = require("express");

/* Get Area of Room --------------------------------*/
exports.getAreaRoom = (req, res) => {
  Area.find({ room: req.body.room_id }, "_id name").exec((err, areas) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    result.Ok(res, { areas: areas });
  });
};

/* Get Area by Id--------------------------------*/
exports.getArea = (req, res) => {
  Area.findById(req.body.area_id).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      result.Ok(res, { area: area });
    } else {
      result.NotFound(res, "Không tìm thấy khu vực này");
    }
  });
};

/* Create Area--------------------------------*/
exports.createArea = (req, res) => {
  const newArea = new Area({
    room: req.body.room_id,
    name: req.body.name,
    size: req.body.size,
    monitors: req.body.monitors,
    emailOn: req.body.emailOn,
    monitorOn: req.body.monitorOn,
  });
  newArea
    .save()
    .then((area) => {
      req.io.to("room" + area.room).emit("area", {
        message: "add",
        data: {
          actionBy: req.userId,
          room: { _id: area.room },
          area: area,
        },
      });
      result.Ok(res, { area: area });
    })
    .catch((err) => {
      result.ServerError(res, err);
    });
};

/* Edit Area--------------------------------*/
exports.editArea = (req, res) => {
  Area.findById(req.body.area_id).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      if (req.body.name) area.name = req.body.name;
      if (req.body.size) {
        if (req.body.size.x0) area.size.x0 = Number(req.body.size.x0);
        if (req.body.size.y0) area.size.y0 = Number(req.body.size.y0);
        if (req.body.size.z0) area.size.z0 = Number(req.body.size.z0);
        if (req.body.size.x1) area.size.x1 = Number(req.body.size.x1);
        if (req.body.size.y1) area.size.y1 = Number(req.body.size.y1);
        if (req.body.size.z1) area.size.z1 = Number(req.body.size.z1);
      }
      if (req.body.monitors) {
        area.monitors = req.body.monitors;
      }
      if (req.body.emailOn != null) area.emailOn = req.body.emailOn;
      if (req.body.monitorOn != null) area.monitorOn = req.body.monitorOn;

      area
        .save()
        .then((area) => {
          req.io.to("room" + area.room).emit("area", {
            message: "edit",
            data: {
              actionBy: req.userId,
              room: { _id: area.room },
              area: area,
            },
          });
          result.Ok(res, { area: area });
        })
        .catch((err) => {
          result.ServerError(res, err);
        });
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};

//Delete Area
exports.deleteArea = (req, res) => {
  Area.deleteOne({ _id: req.body.area_id }).exec((err) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    req.io.to("room" + req.body.room_id).emit("area", {
      message: "delete",
      data: {
        actionBy: req.userId,
        room: { _id: req.body.room_id },
        area: { _id: req.body.area_id },
      },
    });
    result.Ok(res, "Xóa thành công");
  });
};

/* ---------------- MONITOR --------------*/
/* Get Monitor--------------------------------*/
exports.getMonitor = (req, res) => {
  Area.findOne(
    { room: req.body.room_id, _id: req.body.area_id },
    "monitors"
  ).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      result.Ok(res, { monitors: area.monitors });
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};

/* Add Monitor--------------------------------*/
exports.addMonitor = (req, res) => {
  Area.findOne(
    { room: req.body.room_id, _id: req.body.area_id },
    "monitors"
  ).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      if (req.body.monitor) {
        area.monitors.push(req.body.monitor);
        area
          .save()
          .then((area) => {
            req.io.to("room" + req.body.room_id).emit("area", {
              message: "add-monitor",
              data: {
                actionBy: req.userId,
                room: { _id: req.body.room_id },
                area: { _id: req.body.area_id },
                monitors: area.monitors,
              },
            });
            result.Ok(res, { monitors: area.monitors });
          })
          .catch((err) => {
            result.ServerError(res, err);
          });
      } else {
        result.BadRequest(res, "Không thể thêm vào");
      }
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};

/* Edit Monitor--------------------------------*/
exports.editMonitor = (req, res) => {
  Area.findOne(
    { room: req.body.room_id, _id: req.body.area_id },
    "monitors"
  ).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      if (req.body.monitor) {
        let temp = area.monitors.find((mt) => mt._id == req.body.monitor_id);
        if (temp != null) {
          temp.times = req.body.monitor.times;
          temp.temperature = req.body.monitor.temperature;
          if (req.body.monitor.active != null)
            temp.active = req.body.monitor.active;

          area
            .save()
            .then((area) => {
              req.io.to("room" + req.body.room_id).emit("area", {
                message: "edit-monitor",
                data: {
                  actionBy: req.userId,
                  room: { _id: req.body.room_id },
                  area: { _id: req.body.area_id },
                  monitor: temp,
                },
              });
              result.Ok(res, { monitor: temp });
            })
            .catch((err) => {
              result.ServerError(res, err);
            });
        } else {
          result.BadRequest(res, "Không thể sửa");
        }
      } else {
        result.BadRequest(res, "Không thể sửa");
      }
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};

/* Switch Monitor--------------------------------*/
exports.switchMonitor = (req, res) => {
  Area.findOne(
    { room: req.body.room_id, _id: req.body.area_id },
    "monitors"
  ).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      if (req.body.monitor_id) {
        let temp = area.monitors.find((mt) => mt._id == req.body.monitor_id);
        if (temp != null) {
          temp.active = !temp.active;
          area
            .save()
            .then((area) => {
              req.io.to("room" + req.body.room_id).emit("area", {
                message: "switch-monitor",
                data: {
                  actionBy: req.userId,
                  room: { _id: req.body.room_id },
                  area: { _id: req.body.area_id },
                  monitor: temp,
                },
              });
              result.Ok(res, { monitor: temp });
            })
            .catch((err) => {
              result.ServerError(res, err);
            });
        } else {
          result.BadRequest(res, "Không sửa được trạng thái");
        }
      } else {
        result.BadRequest(res, "Không sửa được trạng thái");
      }
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};

/* Delete Monitor--------------------------------*/
exports.deleteMonitor = (req, res) => {
  Area.findOne(
    { room: req.body.room_id, _id: req.body.area_id },
    "monitors"
  ).exec((err, area) => {
    if (err) {
      result.ServerError(res, err);
      return;
    }
    if (area) {
      if (req.body.monitor_id) {
        area.monitors = area.monitors.filter(
          (mt) => mt._id != req.body.monitor_id
        );
        area
          .save()
          .then((area) => {
            req.io.to("room" + req.body.room_id).emit("area", {
              message: "delete-monitor",
              data: {
                actionBy: req.userId,
                room: { _id: req.body.room_id },
                area: { _id: area._id },
                monitors: area.monitors,
              },
            });
            result.Ok(res, { monitors: area.monitors });
          })
          .catch((err) => {
            result.ServerError(res, err);
          });
      } else {
        result.BadRequest(res, "Không thể xóa");
      }
    } else {
      result.NotFound(res, "Không tìm thấy");
    }
  });
};
