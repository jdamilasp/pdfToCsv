/**
 *  config/routes.js
 *
 */

/**
 * require Controllers
 */
const PdfToCsvController = require('./../api/controllers/PdfToCsvController');

/**
 * exports routes
 */
module.exports = function(app) {

    /** --- init routes --**/

    /** ---//--  PdfToCsv Api --------------------------------------------------------------------------------------- */
    /* CREATE ------------------------------------------------------------------------------------------------------- */
    app.get('/api/pdf/to/csv', PdfToCsvController.createPdvToCsv);

    /* READ / GET --------------------------------------------------------------------------------------------------- */

    /* DELETE ------------------------------------------------------------------------------------------------------- */

    /* UPDATE ------------------------------------------------------------------------------------------------------- */

    /** Any Request *****/
    app.get('*',function (req,res) {

        console.log('Unknown Request : '+ req.url);

        for(var i = 0 ; i < 50 ; i++){
            console.log("<option value=\""+i+"\">"+i+"</option>")
        }

        res.sendStatus(404);
    })
};
