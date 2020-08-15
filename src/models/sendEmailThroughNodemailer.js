var _ = require('underscore');
var nodemailer = require('nodemailer');
var MailTransporter = null;
var MailTransporterParams = null;

/**
 * Sending mail through google smtp need set up oauth2 
 * @param {} params 
 */
function createMailTransporter(params) {

    params = params || {};

    if (params.length === 0) {
        reject('no imap params given');
        return;
    }

    if (MailTransporter === null
        || (MailTransporter !== null && MailTransporterParams !== params.transporter)) {
        MailTransporterParams = params.transporter;
        MailTransporter = nodemailer.createTransport(params.transporter);
    }
    return MailTransporter;
};

/**
 * 
 * @param {*} filename file of pdf 
 * @param {*} params email parameters
 * @returns {*} info includes the result, the exact format depends on the transport mechanism used
 * {
info.messageId most transports should return the final Message-Id value used with this property
info.envelope includes the envelope object for the message
info.accepted is an array returned by SMTP transports (includes recipient addresses that were accepted by the server)
info.rejected is an array returned by SMTP transports (includes recipient addresses that were rejected by the server)
info.pending is an array returned by Direct SMTP transport. Includes recipient addresses that were temporarily rejected together with the server response
response is a string returned by SMTP transports and includes the last SMTP response from the server
}
 */
async function sendMail(filename, params) {

    return when.promise(function (resolve, reject) {
        var mailTransporter = createMailTransporter(params);
        var mailData = _.extend({
            from: params.transporter.auth.user || null,
            subject: 'convert',
            attachments: [{
                filename: filename, 
                path: filename
            }]
        }, params.mailOptions);

        mailTransporter.sendMail(mailData, function (error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = {
    sendMail
}