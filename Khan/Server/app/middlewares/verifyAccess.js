const db = require("../models");
const Access = db.access;

checkOwner = (req, res, next) => {
  Access.findOne({
    room: req.body.room_id,
    role: "Owner",
    user: req.userId,
    accepted: true
  }).exec((err, result) => {
    if (err) {
      res.status(400).send({ messageError: "Failed! Id not found!" });
      return;
    }
    if (result) {
      req.access = result;
      next();
    } else {
      res.status(400).send({ messageError: "Failed! You don't have access!" });
      return;
    }
  });
};

checkManager = (req, res, next) => {
  Access.findOne({ room: req.body.room_id, user: req.userId ,accepted: true}).exec(
    (err, result) => {
      if (err) {
        res.status(400).send({ messageError: "Failed! Id not found!" });
        return;
      }

      if (result) {
        if (result.role !== "Viewer") {
          req.access = result;
          next();
        } else {
          res
            .status(400)
            .send({ messageError: "Failed! You don't have access!" });
          return;
        }
      } else {
        res
          .status(400)
          .send({ messageError: "Failed! You don't have access!" });
        return;
      }
    }
  );
};
checkViewer = (req, res, next) => {
  Access.findOne({ room: req.body.room_id, user: req.userId,accepted: true }).exec(
    (err, result) => {
      if (err) {
        res.status(400).send({ messageError: "Failed! Id not found!" });
        return;
      }
      if (result) {
        req.access = result;
        next();
      } else {
        res
          .status(400)
          .send({ messageError: "Failed! You don't have access!" });
        return;
      }
    }
  );
};

const verifyAccess = {
  checkOwner,
  checkManager,
  checkViewer,
};

module.exports = verifyAccess;
