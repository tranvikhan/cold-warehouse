module.exports ={
    /* 2 option: real, fake */
    mode:"fake",
    fake:{
        rowsFake:400,
        fileName:"Data11.xlsx",
    },
    real:{
        baseURL:"http://iotlab.net.vn:3000/api/",
        api:{
            login:"auth/token",
            getValue:"data/gettopbystation/",
            getStation:"station/getbyuser/"
        },
        loginInfo:{
            username:"tester@kholanhctu",
            password:"tester@123",
            grant_type:"password"
        }
    }
    
    
}