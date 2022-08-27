const db = require("../models");
const Notification = db.notification;
const result = require("../helps/result.helps");

/* Get All -------------------------------------*/
exports.getAllNotification = (req,res)=>{
  Notification.find({user: req.userId}).sort({"updatedAt":-1}).exec((err,notifications)=>{
    if (err) {
      result.ServerError(res,err)
      return;
    }
    result.Ok(res,{notifications:notifications})
  })
}

/* Get -------------------------------------*/
exports.getNotification = (req,res)=>{
  Notification.findById(req.body.notification_id).exec((err,notification)=>{
    if (err) {
      result.ServerError(res,err)
      return;
    }
    if(notification){
      result.Ok(res,{notification:notification})
    }else{
      result.NotFound(res,'Không tìm thấy thông báo này')
    }
    
  })
}

 /* Delete -------------------------------------*/
exports.deleteNotification = (req,res)=>{
  Notification.deleteOne({_id: req.body.notification_id}).exec((err)=>{
    if (err) {
      result.ServerError(res,err)
      return;
    }
    result.Ok(res,'Xóa thành công');
  })
}


 /* Delete All -------------------------------------*/
exports.deleteAllNotification = (req,res)=>{
  Notification.deleteMany({user: req.userId}).exec((err)=>{
    if (err) {
      result.ServerError(res,err)
      return;
    }
    result.Ok(res,'Xóa tất cả thành công');
  })
}

