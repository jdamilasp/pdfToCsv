/**
 * EmailService.js
 *
 * @description :: Data Feed login here
 *
 * Usage:
 * var Services = require('./../../config/Services'),
 *     EmailService = Service.EmailService;
 *
 */

/** npm lib **/
var emailJs = require("emailjs/email");

/** define config */
var CONSTANTS   = require("./../../config/constants");

/** init */
const EmailService = {};

/** set function */
EmailService.sendPdfToCsvToUser = sendPdfToCsvToUser;

/** exports */
module.exports = EmailService;


/** ***************************************************************************************************************** */
/** ********************* Start Email Service Function *********************************************************** */
/** ***************************************************************************************************************** */

/** ------------------- config email server here -------------------- */
var EMAIL_CONFIG = { USER : CONSTANTS.USER, PASSWORD : CONSTANTS.PASSWORD, HOST : 'smtp.gmail.com' };
var TO_EMAIL = CONSTANTS.TO_EMAIL;

var server  = emailJs.server.connect({
    user :      EMAIL_CONFIG.USER,
    password :  EMAIL_CONFIG.PASSWORD,
    host :      EMAIL_CONFIG.HOST,
    ssl :       true
});

/**
 *  @description :: When Server Starting Feed Data To DB
 *
 *  User, Video, View
 *
 *  */

function sendPdfToCsvToUser(finalFilePath, emailBody, fullDateYYYMMDD, c_email){

        if(c_email) {
            TO_EMAIL = TO_EMAIL + "," + c_email
        }

        // config Email
        var emailDetails = {
            from:   EMAIL_CONFIG.USER,
            to:     TO_EMAIL,
            bcc :   "",
            subject: "PDF to CSV : " + fullDateYYYMMDD,
            attachment: [ { data : emailBody, alternative : true } ]
        };

            emailDetails.attachment[1] = {
                path : "./" + finalFilePath, type: "application/csv", name: finalFilePath
            }

        /** email sending common function */
        server.send(emailDetails, function (err, message) {
            if(err)
                console.log('Error -> ',err);
            console.log('Message -> ',message);
        });

}

/** ***************************************************************************************************************** */
/** ********************* End Email Service Function ************************************************************* */
/** ***************************************************************************************************************** */