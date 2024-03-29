var phantom = require('phantom');

/**
 * Convert a webpage into pdf file with phantom
 * @param {string} url the webpage url
 * @param {string} filename the pdf file path/name save to
 */
async function createPDFfromUrl(url, filename) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.property('viewportSize', { width: 600, height: 800 });
    await page.property('paperSize', {
        format: 'A6',
        orientation: 'portrait',
        margin: {
            top: '10px',
            left: '10px'
        }
    });
    const status = await page.open(url);
    console.log(`Page opened with status [${status}].`);
    await page.render(filename);
    await instance.exit();
};

module.exports = {
    createPDFfromUrl
}