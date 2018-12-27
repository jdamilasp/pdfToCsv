/**
 * Not-Found.js
 *
 * 404 (Not Found) Response
 *
 * Usage:
 * :: inside Controllers
 * var Response = require('./../../config/responses');
 * return Response.notFound(res);
 * return Response.notFound(res,data);
 *
 * @param  {res} res
 * @param  {object} data
 *
 */

/** exports */
module.exports = function notFound(res,data){

    // if Data
    if(data){
        res.status(404).json(data);
    }else{
        res.status(404)
    }
};
