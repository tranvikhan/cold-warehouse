const db = require("../models");
const Access = db.access;
const result= require("../helps/result.helps");

/* Check user is a Owner of Room --------------------------------------------*/
checkOwner = (req, res, next) => {
  Access.findOne({
    room: req.body.room_id,
    role: "Owner",
    user: req.userId,
    accepted: true
  }).exec((err, access) => {
    if (err) {
      result.ServerError(res,err);
      return;
    }
    if (access) {
      req.access = access;
      next();
    }else {
      result.Forbidden(res,'Không có quyền truy cập');
      return;
    }
  });
};

/* Check Manager Role --------------------------------------------*/
checkManager = (req, res, next) => {
  Access.findOne({ room: req.body.room_id, user: req.userId ,accepted: true}).exec(
    (err, access) => {
      if (err) {
        result.ServerError(res,err);
        return;
      }

      if (access) {
        if (access.role !== "Viewer") {
          req.access = access;
          next();
        } else {
          result.Forbidden(res,'Không có quyền truy cập');
          return;
        }
      } else {
        result.Forbidden(res,'Không có quyền truy cập');
        return;
      }
    }
  );
};

/* Check Viewer Role --------------------------------------------*/
checkViewer = (req, res, next) => {
  Access.findOne({ room: req.body.room_id, user: req.userId,accepted: true }).exec(
    (err, access) => {
      if (err) {
        result.ServerError(res,err);
        return;
      }
      if (access) {
        req.access = access;
        next();
      } else {
        result.Forbidden(res,'Không có quyền truy cập');
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
