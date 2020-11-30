const { loadAllFiles } = require('../models/arkFundETFDownloader');

const arkEtfFundUrlMap = {
    ARKF: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS.pdf',
    ARKK: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_INNOVATION_ETF_ARKK_HOLDINGS.pdf',
    ARKQ: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.pdf',
    ARKW: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_AUTONOMOUS_TECHNOLOGY_&_ROBOTICS_ETF_ARKQ_HOLDINGS.pdf',
    ARKG: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_GENOMIC_REVOLUTION_MULTISECTOR_ETF_ARKG_HOLDINGS.pdf'
}

async function loadArkFundsFiles(req, res){
    try{
        await loadAllFiles(arkEtfFundUrlMap, './data');
        res.status(200);
        res.send('load succeed!');
    }catch(err){
        res.status(err.statusCode||500);
        res.send(err);
    }
}

module.exports = {
    loadArkFundsFiles
}