const db = require("../models");
const Sensor = db.sensor;
const Activate = db.activate;
const result = require("../helps/result.helps");
const { array } = require("../middlewares/upload");

//Get Room Sensor all
exports.getRoomSensor = (req,res)=>{
    Activate
    .find({room: req.body.room_id})
    .exec((err,activates)=>{
        if(err){
            return result.ServerError(res,err);
        }
        if(activates){
            Sensor.find({activate: {$in: activates.map(at => (at._id)) }},'_id name isUsed data_id datatype_id').exec((err,sensors)=>{
                return result.Ok(res,{sensors:sensors});
            });        
        }else{
            return result.Ok(res,{sensors:[]})
        }
    });
}

//Get Room Sensor no used
exports.getRoomSensorNotUse = (req,res)=>{
    Activate
    .find({room: req.body.room_id})
    .exec((err,activates)=>{
        if(err){
            return result.ServerError(res,err);
        }
        if(activates){
            Sensor.find({activate: {$in: activates.map(at => (at._id)) },isUsed: false},'_id name isUsed data_id datatype_id').exec((err,sensors)=>{
                return result.Ok(res,{sensors:sensors});
            });        
        }else{
            return result.Ok(res,{sensors:[]})
        }
    });
}

