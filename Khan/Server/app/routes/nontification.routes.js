const { authJwt} = require("../middlewares");
const controller = require("../controllers/nontification.controller")
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //get all
  app.get("/api/nontification/all",[authJwt.verifyToken],controller.getNotifications);
  //get by nontification_id
  app.get("/api/nontification/",[authJwt.verifyToken],controller.getNotificationById);
  //delete
  app.delete("/api/nontification/",[authJwt.verifyToken],controller.deleteNotification);
  //delete all
  app.delete("/api/nontification/all",[authJwt.verifyToken],controller.deleteAllNotification);
};
