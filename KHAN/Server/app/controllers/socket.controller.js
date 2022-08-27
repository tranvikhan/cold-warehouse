const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Access = db.access;
const User = db.user;

exports.socketController = (socket)=>{
    socket.on('login', token=>{
        let userToken;
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              console.log(err);
            }
            if(decoded!=null){
                userToken = decoded.id;

                User.findById(userToken).then((user)=>{
            
                //join my room
                socket.join('user'+user._id);
                socket.emit('log','You are join: user'+user._id);
                //join access warehouse rooms
                Access.find({ user: user._id,accepted: true },'role _id room')
                .populate("room",'name _id')
                .exec((err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                result.map(rs =>{
                    socket.join('room'+rs.room._id);
                    socket.emit('log','You are join: room'+rs.room._id);
                })
                });
            });
            }
            
        })      
    })


    socket.on('join-room',room =>{
        socket.join(room);
    })

    socket.on('leave-room',room =>{
        socket.leave(room);
    })
}
