var readHtmlFromUrl = require('node-readability');
var when = require('when');
const util = require('util');
const scrape = require('website-scraper');
const fs = require('fs-extra');
const sha1 = require('sha1');

/**
 * convert the callback model to promis if a function following the common error-first callback style, i.e. taking a (err, value)
 * and callback as the last argument
 * https://www.npmjs.com/package/node-readability
 * @param url
 * @param options
 * @return article object 
 * {
 * content // Main Article
 * title
 * html // HTML Source Code
 * document // DOM
 * 
 * }
 */
const readHtmlFromUrlPromise = util.promisify(readHtmlFromUrl);

/**
 * same function as above
 * @param {string} url 
 */
async function getContentThroughNodeReadability(url) {
    return when.promise(function (resolve, reject) {
        readHtmlFromUrl(url, function (err, article, meta) {
            if (err) reject(err);
            else resolve(article);
        });
    });
};

async function getContentFromWebsiteScraper(url){
    var urls = [];
    urls.push(url);
    var directory = sha1(url);
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
        return directory;
    }catch(err){
        console.log(err);
        return new Error(err);
    }
}
module.exports = {
    getContentThroughNodeReadability,
    getContentFromWebsiteScraper
}