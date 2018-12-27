/**
 *  config/services.js
 *
 * Usage:
 * :: inside Controllers
 *
 * var Services = require('./../../config/services'),
 *     EmailService  = Services.EmailService;
 *
 * NOTE : More Details about Services.EmailService pls check in api/services/EmailService.js
 * /

/**
 * require Services
 */
const Services = {
    EmailService : require('./../api/services/EmailService')
};

/**
 * exports Services
 */
module.exports = Services;
