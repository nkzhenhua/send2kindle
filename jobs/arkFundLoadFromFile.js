const {loadFromFile} = require('../src/models/arkFundETFDownloader');

async function main(args) {
    await loadFromFile(args[0], args[1]);
}

var myArgs = process.argv.slice(2);
main(myArgs);
