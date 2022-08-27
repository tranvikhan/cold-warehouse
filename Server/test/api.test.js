const axios = require('axios');
axios.post('http://127.0.0.1:8080/api/auth/signin',{
    username: "vikhan",
    password: "123456"
    
}).then(res=>{
    console.log(res.status);
    console.log(res.data);

}).catch(err =>{
    console.log(err.response.status);
    console.log(err.response.data);
})