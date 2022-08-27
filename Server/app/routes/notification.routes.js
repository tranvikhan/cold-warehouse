const { authJwt} = require("../middlewares");
const controller = require("../controllers/notification.controller")
module.exports = function (app) {
  /* Get All -------------------------------------*/
  app.get("/api/notification/all",[authJwt.verifyToken],controller.getAllNotification);

  /* Get -------------------------------------*/
  app.get("/api/notification/",[authJwt.verifyToken],controller.getNotification);

  /* Delete -------------------------------------*/
  app.delete("/api/notification/",[authJwt.verifyToken],controller.deleteNotification);

  /* Delete All -------------------------------------*/
  app.delete("/api/notification/all",[authJwt.verifyToken],controller.deleteAllNotification);
};
