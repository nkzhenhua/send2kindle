
/**
 * Download a web page link and email to kindle address
 * @param {*} req 
 * @param {*} res 
 */
async function sendLinkToKindle(req, res) {
    res.send(req.body);
};

module.exports = {
    sendLinkToKindle
}