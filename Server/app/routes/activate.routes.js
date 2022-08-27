const { authJwt,verifyAccess } = require("../middlewares");
const controller = require("../controllers/activate.controller");
module.exports = function (app) {
  //Get All Activate of Room
  app.get("/api/room/activate/all",[authJwt.verifyToken,verifyAccess.checkManager],controller.getAllActivate);

   //Activate
   app.post("/api/room/activate/getStation",[authJwt.verifyToken,verifyAccess.checkManager],controller.Activate);
  //Add Activate
  app.post("/api/room/activate/add",[authJwt.verifyToken,verifyAccess.checkManager],controller.addActivate);

  //Delete activate
  app.delete("/api/room/activate",[authJwt.verifyToken,verifyAccess.checkManager],controller.removeActivate);
};