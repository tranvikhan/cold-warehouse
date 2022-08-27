const routes = function (app) {
  require("./auth.routes")(app);
  require("./room.routes")(app);
  require("./sensor.routes")(app);
  require("./user.routes")(app);
  require("./access.routes")(app);
  require("./notification.routes")(app);
  require("./structure.routes")(app);
  require("./data.routes")(app);
  require("./area.routes")(app);
  require("./activate.routes")(app);
};

module.exports = routes;
