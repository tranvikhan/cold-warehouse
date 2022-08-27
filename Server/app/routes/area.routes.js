const { authJwt, verifyAccess, verifyRoom } = require("../middlewares");
const controller = require("../controllers/area.controller");

module.exports = function (app) {
  
  /* Get Area of Room --------------------------------*/
  app.get(
    "/api/room/area/all",
    [authJwt.verifyToken],
    controller.getAreaRoom
  );

  /* Get Area by Id--------------------------------*/
  app.get(
    "/api/room/area",
    [authJwt.verifyToken],
    controller.getArea
  );

  /* Create Room --------------------------------*/
  app.post(
    "/api/room/area/create",
    [authJwt.verifyToken,verifyAccess.checkManager],
    controller.createArea
  );
  
  /* Edit Room --------------------------------*/
  app.post(
    "/api/room/area/edit",
    [authJwt.verifyToken, verifyAccess.checkManager, verifyRoom.checkEdit],
    controller.editArea
  );

  /* Delete Room --------------------------------*/
  app.delete(
    "/api/room/area/",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.deleteArea
  );

  /* ---------------------------MONITOR--------------------------------*/
  /* Get Monitor--------------------------------*/
  app.get(
    "/api/room/area/monitor",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.getMonitor
  );

  /* Add Monitor--------------------------------*/
  app.post(
    "/api/room/area/monitor/add",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.addMonitor
  );

  /* Edit Monitor--------------------------------*/
  app.post(
    "/api/room/area/monitor/edit",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.editMonitor
  );

  /* Switch Monitor--------------------------------*/
  app.post(
    "/api/room/area/monitor/switch",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.switchMonitor
  );

  /* Delete Monitor--------------------------------*/
  app.delete(
    "/api/room/area/monitor",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.deleteMonitor
  );
};
