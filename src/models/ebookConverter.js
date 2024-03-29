var path = require('path')
var xtend = require('xtend')
var ebookConverter = require('ebook-convert')
 
// see more options at https://manual.calibre-ebook.com/generated/en/ebook-convert.html
var options = {
  input: path.join(__dirname, '4ea0ef9160729e5ea3c6252e4e5b17096cd34ab5/index.html'),
  output: path.join(__dirname, 'output.mobi'),
  authors: '"Seth Vincent"',
  pageBreaksBefore: '//h:h1',
  chapter: '//h:h1',
  insertBlankLine: true,
  insertBlankLineSize: '1',
  lineHeight: '12',
  marginTop: '50',
  marginRight: '50',
  marginBottom: '50',
  marginLeft: '50'
}
 
/*
* create mobi file
*/
function ebookConvert(options){
  return ebookConverter(options, function (err) {
    if (err) console.log(err)
  })
}

module.exports = {
  ebookConvert
}