const request = require('request-promise-native');
const fs = require('fs-extra');
const pdf_table_extractor = require('pdf-table-extractor');
const when = require('when');
const _ = require('lodash');
const {upsertEtfData} = require('../db/artETFMySQL');

/**
 * convert the pdf_table_extractor to async function
 * @param {string} url 
 */
async function asyncPdfTableExtractor(pdfFileName) {
    return when.promise(function (resolve, reject) {
        pdf_table_extractor(pdfFileName, function success(result) { // PDF parsed
            console.log(JSON.stringify(result));
            resolve(result);
        }, function error(err) {
            reject(err);
        });
    });
}

async function loadAllFiles(arkEtfFundUrlMap, dir) {
    const pdfFiles = [];
    for (const [etfName, pdfFileURL] of Object.entries(arkEtfFundUrlMap)) {
        console.log(etfName, pdfFileURL);
        const cur = new Date(Date.now());
        const dateStr = cur.getFullYear() + '-' + cur.getMonth() + '-' + cur.getDay();
        const dirPath = dir + '/' + dateStr;
        if (! fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        const pdfFileName = dirPath + '/' + etfName + '.pdf';
        await downloadPDF(pdfFileURL, pdfFileName);
        const pdfTable = await asyncPdfTableExtractor(pdfFileName);
        const result = parseTableData(etfName, pdfTable);
        const affectedRows = await upsertEtfData(result);
        console.log({
            event: 'update',
            affectedRows
        })
        
    }
    return pdfFiles;

}

/**
 * json data structure
 * @param {*} jsonString
 */
function parseTableData(etfName, jsonString) {
    const tableData = jsonString.pageTables[0].tables;
    // shift first empty line
    tableData.shift();
    // etf name and date: Fintech Innovation (ARKF) HOLDINGS\nAs of 11/19/2020
    var title = tableData.shift();
    var dateCol = title[0];
    dateCol = _.trim(dateCol);
    const dateStr = dateCol.substring(dateCol.length - '11/19/2020'.length);
    const etfDate = new Date(dateStr);
    // shift out header: seq, company, ticker, cusip, shares, marketValue, weight
    tableData.shift();
    const data = [];
    for (var row = 0; row < tableData[row].length; row++) {
        const stock = {
            etf_name: etfName,
            holding_date: etfDate,
            company_name: _.trim(tableData[row][1]),
            ticker: tableData[row][2],
            cusip: tableData[row][3],
            shares: _.parseInt(tableData[row][4].replace(/,/g, '')),
            market_value: parseFloat(tableData[row][5].replace(/,/g, '')),
            weight_in_etf: parseFloat(tableData[row][6].replace(/,/g, ''))
        }
        data.push(stock);
    }
    return data;
}

async function downloadPDF(pdfURL, outputFilename) {
    let pdfBuffer = await request.get({uri: pdfURL, encoding: null});
    console.log('Writing downloaded PDF file to ' + outputFilename + '...');
    fs.writeFileSync(outputFilename, pdfBuffer);
}

module.exports = {
    loadAllFiles
}
