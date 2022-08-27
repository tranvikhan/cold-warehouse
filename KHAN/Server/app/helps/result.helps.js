/* Success --------------------------------------------*/
exports.Ok = (res, data) =>{
    res.status(200).send({
        status: 'success',
        result: data
    })
}

/* Error --------------------------------------------*/

/* Bad Request -----------------*/
exports.BadRequest = (res, error) =>{
    res.status(400).send({
        status: 'error',
        result: error
    })
}

/* Unauthorized -----------------*/
exports.Unauthorized = (res, error) =>{
    res.status(401).send({
        status: 'error',
        result: error
    })
}

/* Forbidden -----------------*/
exports.Forbidden = (res, error) =>{
    res.status(403).send({
        status: 'error',
        result: error
    })
}

/* Not Found result -----------------*/
exports.NotFound = (res, error) =>{
    res.status(404).send({
        status: 'error',
        result: error
    })
}

/* Serve Error -----------------*/
exports.ServerError = (res, error) =>{
    res.status(500).send({
        status: 'error',
        result: error
    })
}


