const { authJwt, verifyAccess } = require("../middlewares");
const controller = require("../controllers/data.controller");
module.exports = function (app) {
  /* Get Curren data For Room -------------------------------------*/
  app.get("/api/room/data/current/",[authJwt.verifyToken],controller.getCurrent);

  /* Demo Get Data For Dev -------------------------------------*/
  app.get("/api/room/data/getCubeData", controller.getCubeData);

  /* Get Curren data of Sensor Activate*/
  app.get("/api/room/data/sensor",[authJwt.verifyToken],controller.getSensorData);

  /* Get Curren data of Area */
  app.get("/api/room/data/area",[authJwt.verifyToken],controller.getAreaData);
};
