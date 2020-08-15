const path = require('path')
const { ebookConvert } = require('../../src/models/ebookConverter');

describe('convert html to mobi', () => {
    it('local file convert', () => {
        // see more options at https://manual.calibre-ebook.com/generated/en/ebook-convert.html
        var options = {
            input: path.join(__dirname, '../../src/4ea0ef9160729e5ea3c6252e4e5b17096cd34ab5/index.html'),
            output: path.join(__dirname, 'output.mobi'),
        }
        return ebookConvert(options);
    });
})