const { authJwt, verifyAccess } = require("../middlewares");
const controller = require("../controllers/data.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //get
  app.get(
    "/api/data/current/",
    [authJwt.verifyToken],
    controller.getCurrent
  );
};
