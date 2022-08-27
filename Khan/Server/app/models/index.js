const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.room = require("./room.model");
db.sensor = require("./sensor.model");
db.area = require("./area.model");
db.nontification = require("./nontification.model");
db.access = require("./access.model");
db.structure = require("./structure.model");
db.data = require("./data.model");
db.activate = require("./activate.model");
module.exports = db;
