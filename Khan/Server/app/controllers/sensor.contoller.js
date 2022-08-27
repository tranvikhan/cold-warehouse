
const db = require("../models");
const fake = require("./cubeInterpolation").Fake;
const Sensor = db.sensor;
const Activate = db.activate;

function Sample2() {
  data = fake();
  return JSON.stringify({values: data,min: -7.66,max: -3.44});
}

exports.getTemperature = (req, res) => {
  let mapSize = 10;
  let rd = function () {
    return Math.trunc(Math.random() * 180 - 55);
  };
  let ret = [];
  for (let i = 0; i < Math.pow(mapSize, 3); i++) {
    ret.push(rd());
  }
  //res.send(JSON.stringify({ data: ret }));
  
  res.send(Sample2());
};
// create system sensor
exports.createSensor = (req, res) => {
  const newSensor = new Sensor({
    deviceId: req.body.deviceId,
    activateKey: req.body.activateKey
  });
  newSensor.save().then((sensor)=>{
    res.status(200).send(sensor);
  })
  .catch(err=>{
    res.status(400).send({ messageError: err });
  })
};

//active Sensor
exports.activateSensor = (req, res) => {
 Sensor.find({deviceId: req.body.deviceId}).exec((err,sensor)=>{
    if(err){
      res.status(400).send({ messageError: err });
      return;
    }
    if(sensor.length==0){
      res.status(400).send({ messageError: "deviceId not found" });
      return;
    }
    if(sensor[0].activateKey !== req.body.activateKey){
      res.status(400).send({ messageError: "wrong activate key" });
      return;
    }
    if(sensor[0].activated == true){
      res.status(400).send({ messageError: "sensor already have an owner" });
      return;
    }
    sensor[0].activated = true;
    sensor[0].save().then(sr=>{
      const newActivate = new Activate({
        user: req.body.UserId,
        sensor: sr._id
      })
      
      newActivate.save().then(()=>{
        res.status(200).send({message: "sensor is active"});
      })
      .catch(err=>{
        res.status(400).send({ messageError: err });
      })
    }).catch(err=>{
      res.status(400).send({ messageError: err });
    })
    
 });
};

//Get No Activate Sensor
exports.getNoActivateSensor = (req,res)=>{
  Sensor.find({activated: false},"_id name deviceId").exec((err,sensors)=>{
    if(err){
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send(sensors);
  })
}

//Get Activate Sensor By User
exports.getActivateSensor = (req,res)=>{
  Activate.find({user:req.UserId},"sensor").populate("sensor").exec((err,sensors)=>{
    if(err){
      res.status(400).send({ messageError: err });
      return;
    }
    res.status(200).send(sensors);
  })
}