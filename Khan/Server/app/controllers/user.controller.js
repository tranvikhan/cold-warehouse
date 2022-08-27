const db = require("../models");
const fs = require("fs");
const User = db.user;
exports.getAllUser = (req, res) => {
  User.find({}).exec((err, user) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    if (user) res.status(200).json(user);
  });
};
exports.getAvatar = (req, res) => {
  try {
    fs.readFile("./uploads/UserAvatar/" + req.params.filename, function (
      err,
      data
    ) {
      if (err) {
        res.status(404).send("Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data); // Send the file data to the browser.
      }
    });
  } catch (err) {
    res.status(404).send(err);
  }
};
exports.findUser = (req, res) => {
  User.find({
    username: new RegExp(req.body.username, "i"),
  }).exec((err, user) => {
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send(user);
  });
};
