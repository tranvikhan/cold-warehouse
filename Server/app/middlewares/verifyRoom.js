const db = require("../models");
const Access = db.access;
const result= require("../helps/result.helps");

/* Room'name when create --------------------------------------------*/
checkCreate = (req, res, next) => {
  Access.find({ user: req.userId })
    .populate("room")
    .exec((err, access) => {
      if (err) {
        result.ServerError(res,err);
        return;
      }
      if(access){
        for (let i = 0; i < access.length; i++) {
          if (access[i].room.name === req.body.name) {
            result.BadRequest(res,'Tên kho lạnh này đã tồn tại');
            return;
          }
        }
      }
      
      next();
    });
};

/* Room'name when edit --------------------------------------------*/
checkEdit = (req, res, next) => {
  if (req.body.name) {
    Access.find({ user: req.userId })
      .populate("room")
      .exec((err, access) => {
        if (err) {
          result.ServerError(res,err);
          return;
        }
        for (let i = 0; i < access.length; i++) {
          if (
            access[i].room.name === req.body.name &&
            access[i].room._id != req.body.room_id
          ) {
            result.BadRequest(res,'Tên kho lạnh này đã tồn tại');
            return;
          }
        }
        next();
      });
  }
};

const verifyRoom = {
  checkCreate,
  checkEdit,
};

module.exports = verifyRoom;
