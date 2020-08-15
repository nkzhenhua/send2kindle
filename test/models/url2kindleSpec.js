const pageToKindle = require('../../src/models/url2kindle');

describe('test html content to kindle', () => {
    it('send email', async (done) => {
        var sendParams = {
            mailOptions: {
                to: 'nkzhenhua@gmail.com'
            },
            //Nodemailer Transporter
            transporter: {
                host: 'smtp.qq.com',
                port: 465,
                secure: true,
                auth: {
                    type: 'OAuth2',
                    user: '',
                    pass: ''
                },
                debug: true,
                logger: true
            }
        };
        //const result = await pageToKindle.sendUrlToKindle('https://www.npmjs.com/package/node-readability', sendParams);
        //const result = await pageToKindle.sendMail('./aaa.pdf',sendParams);
        done();
    }, 100000);
});