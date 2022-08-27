const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const result = require("../helps/result.helps");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/* Sign Up --------------------------------------------*/
exports.signup = (req, res) => {
  const user = new User({
    fullname: req.body.fullname ? req.body.fullname : req.body.username,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      result.ServerError(res,err);
      return;
    }
    user.password = null;
    result.Ok(res,{user:user});
  });

};

/* Sign In --------------------------------------------*/
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  },'').exec((err, user) => {
     if (err) {
      result.ServerError(res,err);
      return;
    }
    if (!user) {    
      result.NotFound(res,'Tài khoản không tồn tại');
      return;
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      result.BadRequest(res,'Sai mật khẩu');
      return;
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    
    user.password = null;
    result.Ok(res,{user:user ,accessToken: token});
    return;
  });
};
