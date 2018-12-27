/**
 * PdfToCsv Model js
 */

/** npm lib */
const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

/** PdfToCsv Json  */
const PdfToCsv = {
    un: String, // username
    e: String, // email
    fn: String, // first name
    ln: String, // last name
};

/** Options */
const Options = { autoIndex: false };

/** PdfToCsv Schema */
const PdfToCsvSchema = Schema(PdfToCsv,Options);

const transform = function (doc, ret, options) {
    return {
        'id': doc._id,
        'joined_at': doc._id.getTimestamp(),
        'first_name': doc.fn.trim(),
        'last_name': doc.ln.trim(),
        'username': doc.un,
        'email': doc.e
    };
};
PdfToCsvSchema.statics.transform    = transform;
PdfToCsvSchema.options.toJSON       = {'transform': transform, 'virtuals': true};
PdfToCsvSchema.options.toObject     = {'transform': transform, 'virtuals': true};

/** exports **/
module.exports = PdfToCsvSchema;