const { authJwt, verifyAccess, verifyRoom } = require("../middlewares");
const controller = require("../controllers/room.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //create
  app.post(
    "/api/room/create",
    [authJwt.verifyToken, verifyRoom.checkCreate],
    controller.createRoom
  );
  //edit
  app.post(
    "/api/room/edit",
    [authJwt.verifyToken, verifyAccess.checkManager, verifyRoom.checkEdit],
    controller.editRoom
  );
  //getMyAccessRoom
  app.get("/api/room/all", [authJwt.verifyToken], controller.getMyAccessRoom);
  //get Room by Id
  app.get("/api/room/", [authJwt.verifyToken], controller.getRoomById);

  //delete
  app.delete(
    "/api/room/",
    [authJwt.verifyToken, verifyAccess.checkOwner],
    controller.deleteRoom
  );
};
