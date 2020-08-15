var readHtmlFromUrl = require('node-readability');
var when = require('when');
const util = require('util');
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
async function getContent(url) {
    return when.promise(function (resolve, reject) {
        readHtmlFromUrl(url, function (err, article, meta) {
            if (err) reject(err);
            else resolve(article);
        });
    });
};