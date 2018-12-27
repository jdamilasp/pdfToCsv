/**
 * Not-Found.js
 *
 * 403 (Forbidden) Response
 *
 * Usage:
 * :: inside Controllers
 * var Response = require('./../../config/responses');
 * return Response.forbidden(res);
 * return Response.forbidden(res,data);
 *
 * @param  {res} res
 * @param  {object} data
 *
 */

/** exports */
module.exports = function forbidden(res,data){

    // if Data
    if(data){
        res.status(403).json(data);
    }else{
        res.status(403)
    }
};
