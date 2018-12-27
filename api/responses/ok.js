/**
 * Ok.js
 *
 * 200 (OK) Response
 *
 * Usage:
 * :: inside Controllers
 * var Response = require('./../../config/responses');
 * return Response.ok(res);
 * return Response.ok(res,data);
 *
 * @param  {res} res
 * @param  {object} data
 *
 */

/** exports */
module.exports = function ok(res,data){

    // if Data
    if(data){
        res.status(200).json(data);
    }else{
        res.status(200);
    }
};
