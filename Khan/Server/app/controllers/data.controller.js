
const db = require("../models");
const axios = require('axios');
const config = require('./GetSensorData/config.json')
const visualData = require('./GetSensorData/visualData');

exports.getCurrent = (req, res) => {
    if(config.mode !="fake"){
        //REAL DATA
        if(req.session.tokenApi){
            axios({
                url:config.baseURL+config.api.getValue,
                method:"get",
                headers:{
                    "Authorization":"JWT "+req.session.tokenApi
                },
            
            }).then(result =>{
                res.send(result.data);
            }).catch(err=>{
                res.send(err);
            });
    
        } else {
            axios.post(config.baseURL+config.api.login,config.loginInfo).then(rep =>{
            req.session.tokenApi = rep.data.accessToken;
            this.getCurrent(req,res);
        }).catch(err=>{
            res.send(err);
        }); 
        }
    }else{
        if(!req.session.CountRow){
            req.session.CountRow =1;
        }
        else if(req.session.CountRow < (config.rowsFake-1)*18)
        {
            req.session.CountRow = req.session.CountRow+18;
        }else{
            req.session.CountRow =1;
        }
        //VISUAL DATA
        visualData.Get(req.session.CountRow).then(data=>{
            res.status(200).send(data);
        })
        .catch(err=>{
            res.status(400).send(err);
        })
    }
    

};
