const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/", controller.getAllUser);
  app.get("/api/user/find", controller.findUser);
  app.get("/api/user/avatar/:filename", controller.getAvatar);
};
