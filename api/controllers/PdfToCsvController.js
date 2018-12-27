/**
 *  PdfToCsvController.js
 *
 *  @description :: Pdf-To-Csvrelated logic
 *
 */

/** npm libs */
var fs          = require('fs');
var pdfUtil     = require('pdf-to-text');
var downloadPdf = require('download-pdf');

/**  define Models */
const Models    = require('./../../config/models');
const PdfToCsv  = Models.PdfToCsv;

/**  define Services */
const Services  = require('./../../config/services');
const EmailService = Services.EmailService;

/** define config */
const   PESPONSES   = require('./../../config/responses');
const   CONSTANT    = require('./../../config/constants');


/**  init */
const PdfToCsvController = {};

/**  set functions */
/* CREATE ----------------------------------------------------------------------------------------------------------- */
PdfToCsvController.createPdvToCsv = createPdvToCsv; 

/* READ / GET ------------------------------------------------------------------------------------------------------- */

/* DELETE ----------------------------------------------------------------------------------------------------------- */

/* UPDATE ----------------------------------------------------------------------------------------------------------- */

/**  exports */
module.exports = PdfToCsvController;

/** ***************************************************************************************************************** */
/** ********************* Start Pdf-To-Csv Controller Function ****************************************************** */
/** ***************************************************************************************************************** */

/* CREATE ----------------------------------------------------------------------------------------------------------- */
/**
 * @description :: Create Pdf to Csv File
 *
 */
function createPdvToCsv(req, res) {

    console.log("===============================================");
    /** Variable */
    var year = req.query.year;
    var month = req.query.month;
    var day = req.query.day;
    var total = req.query.total;
    var c_email = req.query.email;

    /** TODO : Validate query params */
    console.log("YYYY-MM-DD=#TotalRow/Email")
    console.log(year +"-" + month +"-"+ day +"="+ total +"/" + c_email);

    var start = 14;
    var end = start + Number(total) - 1;
    var pdf_path = "Government_Securities_Trade_Summary_" + day + "_" + month + "_" + year + ".pdf";
    var headerOfFile = "No,ISIN,Tenure,Security Type,Opening Yield %,Closing Yield %,Highest Yield %,Lowest Yield %,Weighted Average Yield %,Value Rs Mn,No of Trades";
    var finalResult = '';
    var fullDate = year + "_" + month + "_" + day;
    var fullDateYYYMMDD =  year + "-" + month + "-" + day;
    var finalFilePath =  fullDate + ".csv";
    var onlineURL = "https://www.cbsl.gov.lk/sites/default/files/cbslweb_documents/press/pr/" + pdf_path;
    var emailBody = "PDF URL : " + onlineURL ;

    var options = {
        directory: "./",
        filename: pdf_path
    }
 
    console.log("Before DownLoading ............!"); 
    try {
        downloadPdf(onlineURL, options, function(err){
            if (err){
                console.log("Error Downloading .................:(", err);
                return PESPONSES.notFound(req, { message : "Pdf Not Found", url : onlineURL });
            }
            console.log("After DownLoadd .............. !")
                
                //option to extract text from page 0 to 10
                var option = {from: 0, to: 10};

                pdfUtil.pdfToText(pdf_path, option, function(err, data) {
                    if (err) throw(err);

                    var newData = data.split("\n");
                    /** READ PDF and Line 14 to 29 Append to String Array **/
                    var stringArray = [];
                    for(var k=start-1; k < end; k++){
                        stringArray.push(newData[k]);
                    }
                    var resultArray = [];
                    for(var i=0; i < stringArray.length; i++){
                        var oneRow = stringArray[i];
                        var trimRow = oneRow.trim();
                        var replaceSpaceRow = trimRow.replace(/\s\s+/g, ' ');
                        var splitRow = replaceSpaceRow.split(' ');
                        resultArray.push(splitRow);
                    }
                    
                    finalResult = headerOfFile + "\n";

                    for(var j=0; j < resultArray.length; j++){
                        var oneLine = resultArray[j];
                        var oneLineResult = '';
                        for(var k=0; k < oneLine.length; k++){
                            oneLineResult = oneLineResult + oneLine[k] + ",";
                        }
                        finalResult = finalResult + oneLineResult + "\n";
                    }

                    fs.writeFile("./" + finalFilePath, finalResult ,function(err){
                        if(err) throw(err);
                        console.log(" ================================================= ");
                        console.log(" ********* PDF TO CSV CONVERTOR RESULT *********** ");
                        console.log(" ================================================= ");
                        console.log(" Pdf File Name : " + pdf_path);
                        console.log(" Total Recored : " + total);
                        console.log(" Year-Month-Day : " + year + " - " + month + " - " + day);
                        console.log(" ------------------------------------------------- ");
                        console.log(" CSV File Name : " + finalFilePath);
                        console.log(" ------------------------------------------------- ");
                        console.log( finalResult ); 
                        /** TODO : Calling Email Sending Function Here **/      
                        EmailService.sendPdfToCsvToUser(finalFilePath,emailBody,fullDateYYYMMDD,c_email);     
                        console.log(" ================================================= ");

                        return PESPONSES.ok(res, { message : "Successfully Create csv File", url : onlineURL });                
                    });
                });


        });
    }catch(err) {
        console.log(err);
    }

}

/* READ / GET ------------------------------------------------------------------------------------------------------- */

/* DELETE ----------------------------------------------------------------------------------------------------------- */

/* UPDATE ----------------------------------------------------------------------------------------------------------- */

/** ***************************************************************************************************************** */
/** ********************* End Pdf-To-Csv Controller Function ******************************************************** */
/** ***************************************************************************************************************** */
