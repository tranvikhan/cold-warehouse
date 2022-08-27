const db = require("../models");
const User = db.user;
const result = require("../helps/result.helps");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      result.ServerError(res,err);
      return;
    }

    if (user) {
      result.BadRequest(res,'Tên đăng nhập này đã tồn tại')
      return;
    }
    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        result.ServerError(res,err);
        return;
      }

      if (user) {
        result.BadRequest(res,'Email này đã tồn tại')
        return;
      }
      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
