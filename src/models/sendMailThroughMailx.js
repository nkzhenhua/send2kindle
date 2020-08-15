/**
 * Send email through Mailx which use the local installed Postfix smtp 
 */
"use strict";
const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * send an email to amazon kindle email addr from fromAddr with local Mailx which through Postfix local SMTP
 * So make sure the fromAddr is whitelisted in the kindle account
 * (it only works for kindle email addr without any authentication )
 * @param {string} filename attachement file to send to kindle
 * @param {string} toAddr kindle addr
 * @param {string} fromAddr whitelisted email by the kindle
 */
async function sendEmailToKindle(filename, toAddr, fromAddr) {
    console.log('Starting to send email!');
    sendMailCommand = util.format('echo "send2kindle" | mailx -s "Convert" -r "%s" -a %s "%s"', fromAddr, filename, toAddr);
    const { stdout, stderr } = await exec(sendMailCommand);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log('send email successfully!');
}

module.exports = {
    sendEmailToKindle
}
