const db = require("../models");
const Nontification = db.nontification;

//get all nontification
exports.getNotifications = (req,res)=>{
  Nontification.find({user: req.userId}).exec((err,nontification)=>{
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send(nontification);
  })
}

//get nontification by id
exports.getNotificationById = (req,res)=>{
  Nontification.findById(req.body.nontification_id).exec((err,nontification)=>{
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send(nontification);
  })
}
//delete Nontification
exports.deleteNotification = (req,res)=>{
  Nontification.deleteOne({_id: req.body.nontification_id}).exec((err)=>{
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send({message:"Delete Success"});
  })
}
//delete All Nontification
exports.deleteAllNotification = (req,res)=>{
  Nontification.deleteMany({user: req.userId}).exec((err)=>{
    if (err) {
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send({message:"Delete All Success"});
  })
}