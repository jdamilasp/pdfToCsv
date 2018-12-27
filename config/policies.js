/**
 *  config/policies.js
 *
 * @description :: Verify jwt Token validation
 *
 * if valid
 * next() && res.userId
 *
 * else
 * forbidden()
 *
 */

/** Npm lib */
const jwt = require('jsonwebtoken');

/** Require Response */
const Response = require('./responses');

/** Config */
const SECRET  = require('./secret');

/** Define  **/
const POLICIES = function (req,res,next) {

    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret
        jwt.verify(token, SECRET.AUTH_TOKEN_SECRET , function(err, decoded) {

            if (err) {
                return Response.forbidden(res);
            } else {

                // if _id
                if(decoded._id){
                    // if everything Ok , set userId
                    req.userId   = decoded._id;
                    next();
                }else{
                    return Response.forbidden(res);
                }
            }
        });

    } else {

        // if there is no token
        // return an error
        return Response.forbidden(res);
    }
};

/** Export POLICIES **/
module.exports = POLICIES;