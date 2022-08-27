const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const result= require("../helps/result.helps");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return result.BadRequest(res,'Không tìm thấy Token');
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return result.Unauthorized(res,'Không có quyền truy cập (kiểm tra lại token)')
    }

    req.userId = decoded.id;
    next();

  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
