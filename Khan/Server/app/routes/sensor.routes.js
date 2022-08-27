const { authJwt } = require("../middlewares");
const controller = require("../controllers/sensor.contoller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/sensor/demoTemperature", controller.getTemperature);

  //create Sensor
  app.post("/api/sensor/create",controller.createSensor);
  //active Sensor
  app.post("/api/sensor/activate",[authJwt.verifyToken],controller.activateSensor);
  //get all Sensor Not Activate
  app.get("/api/sensor/noActivate",[authJwt.verifyToken],controller.getNoActivateSensor);
  //get Activate Sensor
  app.get("/api/sensor/activate",[authJwt.verifyToken],controller.getActivateSensor);
};
