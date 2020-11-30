const {loadAllFiles} = require('../src/models/arkFundETFDownloader');

const arkEtfFundUrlMap = {
    ARKF: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS.pdf',
    ARKK: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_INNOVATION_ETF_ARKK_HOLDINGS.pdf',
    ARKQ: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.pdf',
    ARKW: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.pdf',
    ARKG: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_GENOMIC_REVOLUTION_MULTISECTOR_ETF_ARKG_HOLDINGS.pdf'
}

async function main(args){
    await loadAllFiles(arkEtfFundUrlMap, args[0]);
}

var myArgs = process.argv.slice(2);
main(myArgs);

