/**
 *  config/responses.js
 *
 *  @description :: all response config here
 *
 * Usage:
 * :: inside Controllers
 *
 * eg :
 * var Response = require('./../../config/responses');
 * return Response.ok(res);
 *
 * or
 *
 * var Response = require('./../../config/responses'),
 *     Ok = Response.ok;
 * return Ok(res);
 *
 * @required :: {res} res
 *
 * NOTE : More Details about Response.ok pls check in api/response/ok.js
 *
 * /

/**
 * require responses
 */
const responses = {
    ok          : require( './../api/responses/ok'),
    notFound    : require( './../api/responses/notFound'),
    forbidden   : require( './../api/responses/forbidden')
};


/** Export responses **/
module.exports = responses;
