const axios = require('axios');
const constants = require('constants/apiConfig');
/**
 * Fetch data from given url
 * @param {*} config
 */
const requestApi =(config={}) => {
    //console.log(config);
    return axios({...config,baseURL: constants.BASE_URL})
        .then(res=>{
            /* console.log(res.status);
            console.log(res.data); */
            return res.data;
        })
        .catch(err =>{
            /* console.log(err.response.status);
            console.log(err.response.data); */
            return err.response.data;
        })
};

export { requestApi };
