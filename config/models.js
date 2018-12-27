/**
 *  config/models.js
 *
 * @description :: all model config here
 *
 * Usage:
 * :: inside Controllers or Services
 *
 * var Models = require('./../../config/models'),
 *     PdfToCsv   = Models.PdfToCsv;
 *
 * NOTE : More Details about Models.PdfToCsv pls check in api/models/PdfToCsv.js
 *
 * */

/**
 * npm libs
 */
const mongoose = require('mongoose');

/**
 * require models
 */
const   PdfToCsv    = require('./../api/models/PdfToCsv');

/**
 *  define models json
 */
const models = {
    PdfToCsv :      mongoose.model('PdfToCsv', PdfToCsv)
};

/**
 * exports models
 */
module.exports = models;