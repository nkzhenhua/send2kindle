/**
 * Send email through Mailx which use the local installed Postfix smtp 
 */
"use strict";
const exec = util.promisify(require('child_process').exec);

async function sendEmailToKindle(filename, toAddr, fromAddr) {
    sendMailCommand = util.format('echo "send2kindle" | mailx -s "Convert" -r %s -a %s %s', fromAddr, filename, toAddr);
    try {
        const { stdout, stderr } = await exec(sendMailCommand);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    } catch (e) {
        console.error(e); // should contain code (exit code) and signal (that caused the termination).
    }
}

module.exports = {
    sendEmailToKindle
}
