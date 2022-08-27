const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const verifyRoom = require("./verifyRoom");
const verifyAccess = require("./verifyAccess");

module.exports = {
  authJwt,
  verifySignUp,
  verifyRoom,
  verifyAccess,
};
