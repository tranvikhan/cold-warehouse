const { authJwt ,verifyAccess} = require("../middlewares");
const controller = require("../controllers/structure.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
// add
 app.post("/api/room/structure/add",[authJwt.verifyToken, verifyAccess.checkManager],controller.addStructure);
 // edit
 app.post("/api/room/structure/edit",[authJwt.verifyToken, verifyAccess.checkManager],controller.editStructure);
 //delete
 app.post("/api/room/structure/delete",[authJwt.verifyToken, verifyAccess.checkManager],controller.deleteStructure);
 // get
 app.get("/api/room/structure",[authJwt.verifyToken, verifyAccess.checkManager],controller.getStructure);
};
