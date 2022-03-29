
const { createPDFfromUrl } = require('../models/phantomTools');
const { sendEmailToKindle } = require('../models/sendMailThroughMailx');
const sha1 = require('sha1');
const { fstat } = require('fs-extra');
const fs = require('fs-extra');
/**
 * Download a web page link and email to kindle address
 * @param {*} req 
 * @param {*} res 
 */
async function sendLinkToKindle(req, res) {

    const url = req.body.url;
    const fromAddr = req.body.fromAddr;
    const toAddr = req.body.toAddr;

    const pdfFileName = sha1(req.body.url)+'.pdf';

    try{
        await createPDFfromUrl(url, pdfFileName);
        await sendEmailToKindle(pdfFileName, toAddr, fromAddr);
        res.status(200);
        res.send(req.body.url + ' send succeed!');
    }catch(err){
        res.status(err.statusCode||500);
        res.send(err);
    }
    await fs.remove(pdfFileName);
};

async function home(req, res) {
    res.send("welcome to send2kindle!")
};

async function echo(req, res) {
    res.status(200);
    res.send(req.url);
};

module.exports = {
    sendLinkToKindle,
    home,
    echo
}