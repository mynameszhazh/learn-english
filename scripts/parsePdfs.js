const fs = require('fs')
const pdf = require('pdf-parse')

main()

function main() {
  let dataBuffer = fs.readFileSync('./1.pdf');

  pdf(dataBuffer).then(function (data) {

    // number of pages
    // console.log(data.numpages);
    // number of rendered pages
    // console.log(data.numrender);
    // PDF info
    // console.log(data.info);
    // PDF metadata
    // console.log(data.metadata);
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    // console.log(data.version);
    // PDF text
    // console.log((data.text.split('\n')))
    const ret = parse(data.text)
    // let a = ret.reverse()
  });
}

const START_STRING = '中文 英文 K.K.音标'

function parse(text) {
  let textArr = text.split('\n').map(item => item.trim())
  const startIndex = textArr.findIndex(item => item === START_STRING)
  const ret = []
  textArr = textArr.slice(startIndex + 1).filter(i => i && !/\d/.test(Number(i)))
  console.log("textArr:", textArr)
  // console.log("textArr:", textArr.reverse())
  // for (let i = 0; i < textArr.length; i++) {
  //   const chinese = textArr[i];
  //   const [english, soundmark] = textArr[i + 1].split(' ')
  //   ret.push({
  //     chinese,
  //     english,
  //     soundmark
  //   })
  //   i++
  // }
  // return ret
}