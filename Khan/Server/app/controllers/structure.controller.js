const { structure } = require("../models");
const db = require("../models");
const Structure = db.structure;

//add Structure
exports.addStructure = (req,res)=>{
    Structure.findOne({ room: req.body.room_id}).sort({"createdAt":-1}).exec((err,Oldstructure)=>{
        if(err){
            res.status(400).send({ messageError: err });
            return;
        }
        let newStructure = new Structure();
        newStructure.room = req.body.room_id;
        if(Oldstructure){
            newStructure.map = [...Oldstructure.map];
        }else{
            newStructure.map = new Array();
        }
        
        newStructure.map.push({
            sensor: req.body.sensor_id,
            location:{
                x: req.body.location.x,
                y: req.body.location.y, 
                z:req.body.location.z
            }
        });
        newStructure.save().then(()=>{
            res.status(200).send(newStructure);
        }).catch(err=>{
            res.status(400).send({ messageError: err });
        })
        
    })
}
//get Structure
exports.getStructure =(req,res)=>{
    Structure.findOne({ room: req.body.room_id}).populate({
        path: 'map',
        populate: { path: 'sensor' }
      }).sort({"createdAt":-1}).exec((err,structure)=>{
        if(err){
            res.status(400).send({ messageError: err });
            return;
        }
        res.status(200).send(structure);
    });
}

//edit Structure
exports.editStructure =(req,res)=>{
    Structure.findOne({ room: req.body.room_id}).sort({"createdAt":-1}).exec((err,Oldstructure)=>{
        if(err){
            res.status(400).send({ messageError: err });
            return;
        }
        let newStructure = new Structure();
        newStructure.room = req.body.room_id;
        if(Oldstructure){
            newStructure.map = [...Oldstructure.map];
        }else{
            newStructure.map = new Array();
        }
        
        newStructure.map = newStructure.map.filter(st => st.sensor != req.body.sensor_id );
        newStructure.map.push({
            sensor: req.body.sensor_id,
            location:{
                x: req.body.location.x,
                y: req.body.location.y, 
                z:req.body.location.z
            }
        });
        newStructure.save().then(()=>{
            res.status(200).send(newStructure);
        }).catch(err=>{
            res.status(400).send({ messageError: err });
        })
    });
}

//delete Structure
exports.deleteStructure =(req,res)=>{
    Structure.findOne({ room: req.body.room_id}).sort({"createdAt":-1}).exec((err,Oldstructure)=>{
        if(err){
            res.status(400).send({ messageError: err });
            return;
        }
        let newStructure = new Structure();
        newStructure.room = req.body.room_id;
        if(Oldstructure){
            newStructure.map = [...Oldstructure.map];
        }else{
            newStructure.map = new Array();
        }
        
        newStructure.map = newStructure.map.filter(st => st.sensor != req.body.sensor_id);
        newStructure.save().then(()=>{
            res.status(200).send(newStructure);
        }).catch(err=>{
            res.status(400).send({ messageError: err });
        })
    });
}