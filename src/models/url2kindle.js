// refer from: https://github.com/moszeed/page-to-kindle/blob/master/src/pageToKindle.js
"use strict";
var fs = require('fs-extra');

function cleanUpUrl(url) {
    url = url.replace(/[^a-zA-Z0-9 ]/g, "");
    url = url.replace("http", "");
    url = url.replace("html", "");
    url = url.replace("www", "");
    url = url.substring(0, 30);
    url = url.trim();

    return url;
};

async function cleanUpEnv(filePath) {
    return await fs.remove(filePath);
};

async function sendUrlToKindle(url, toAddr, fromAddr) {
    const filename = cleanUpUrl(url) + '.pdf';
    await createPDFfromUrl(url, filename);
    await sendMail(filename, toAddr, fromAddr);
    await cleanUpEnv(filename);
};

module.exports = {
    sendUrlToKindle
}