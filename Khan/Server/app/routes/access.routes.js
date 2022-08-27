const { authJwt, verifyAccess } = require("../middlewares");
const controller = require("../controllers/access.controller");
module.exports = function (app) {

  /* Get Room Access List-------------------------------------*/
  app.get("/api/room/access/all", [authJwt.verifyToken], controller.getRoomAccess);

  /* Get User Access List-------------------------------------*/
  app.get(
    "/api/room/access/",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.getUserAccess
  );

/* Add Room Access -------------------------------------*/
  app.post(
    "/api/room/access/add",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.addAccess
  );


/* Edit Room Access -------------------------------------*/
  app.post(
    "/api/room/access/edit",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.editAccess
  );

/* Delete Room Access -------------------------------------*/
  app.delete(
    "/api/room/access/",
    [authJwt.verifyToken, verifyAccess.checkManager],
    controller.deleteAccess
  );

/* Reply Room Access -------------------------------------*/
  app.post("/api/room/access/reply",[authJwt.verifyToken], controller.replyAccess);


};
