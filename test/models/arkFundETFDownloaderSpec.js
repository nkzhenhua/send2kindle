const { loadAllFiles } = require('../../src/models/arkFundETFDownloader');

const arkEtfFundUrlMap = {
    ARKF: 'https://ark-funds.com/wp-content/fundsiteliterature/holdings/ARK_FINTECH_INNOVATION_ETF_ARKF_HOLDINGS.pdf'
}
describe('download ark etf daily snapshot', () => {
    it('download pdf files', async (done) => {
        await loadAllFiles(arkEtfFundUrlMap, './');
        done();
    }, 100000);
});