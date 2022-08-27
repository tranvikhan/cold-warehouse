const { authJwt ,verifyAccess} = require("../middlewares");
const controller = require("../controllers/structure.controller");
module.exports = function (app) {

  /* Get -------------------------------------*/
   app.get("/api/room/structure",[authJwt.verifyToken, verifyAccess.checkManager],controller.getStructure);

  /* Add Sensor -------------------------------------*/
  app.post("/api/room/structure/sensor/add",[authJwt.verifyToken, verifyAccess.checkManager],controller.addStructureSensor);

  /* Edit Sensor -------------------------------------*/
  app.post("/api/room/structure/sensor/edit",[authJwt.verifyToken, verifyAccess.checkManager],controller.editStructureSensor);

  /* Delete Sensor -------------------------------------*/
  app.post("/api/room/structure/sensor/delete",[authJwt.verifyToken, verifyAccess.checkManager],controller.deleteStructureSensor);

  /* Swap Sensor -------------------------------------*/
  app.post("/api/room/structure/sensor/swap",[authJwt.verifyToken, verifyAccess.checkManager],controller.swapStructureSensor);
};
