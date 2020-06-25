const scrape = require('website-scraper');
const fs = require('fs-extra');
const sha1 = require('sha1');

/**
 * Download a web page link and email to kindle address
 * @param {*} req 
 * @param {*} res 
 */
async function sendLinkToKindle(req, res) {

    var urls = [];
    urls.push(req.body.url);

    var directory = sha1(req.body.url);

    const options = {
        urls,
        directory,
        sources: [
            { selector: 'img', attr: 'src' }
        ],
        ignoreErrors: true
    };
    try{
        await scrape(options);
        //await fs.remove();
    }catch(err){
        console.log(err);
        res.send("error when download page")
    }
    res.send(req.body);
};

module.exports = {
    sendLinkToKindle
}