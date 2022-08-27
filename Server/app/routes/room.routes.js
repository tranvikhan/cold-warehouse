const { authJwt, verifyAccess, verifyRoom } = require("../middlewares");
const controller = require("../controllers/room.controller");

module.exports = function (app) {
  /* Create -------------------------------------*/
  app.post(
    "/api/room/create",
    [authJwt.verifyToken, verifyRoom.checkCreate],
    controller.createRoom
  );
  
  /* Edit -------------------------------------*/
  app.post(
    "/api/room/edit",
    [authJwt.verifyToken, verifyAccess.checkManager, verifyRoom.checkEdit],
    controller.editRoom
  );
  /* Get By ID -------------------------------------*/
  app.get("/api/room/", [authJwt.verifyToken], controller.getRoomById);

  /* Delete Room -------------------------------------*/
  app.delete(
    "/api/room/",
    [authJwt.verifyToken, verifyAccess.checkOwner],
    controller.deleteRoom
  );
};
