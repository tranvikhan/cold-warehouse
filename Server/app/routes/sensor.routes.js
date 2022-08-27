const { authJwt,verifyAccess } = require("../middlewares");
const controller = require("../controllers/sensor.contoller");
module.exports = function (app) {
  //Get Room Sensor all
  app.get("/api/room/sensor/all",[authJwt.verifyToken,verifyAccess.checkManager],controller.getRoomSensor);

  //Get Room Sensor no used
  app.get("/api/room/sensor/notUse",[authJwt.verifyToken,verifyAccess.checkManager],controller.getRoomSensorNotUse);

};
