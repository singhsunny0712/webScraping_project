//  request => to all match Page
//  loop command=> match.js
let fs = require("fs");
// npm 
let cheerio = require("cheerio");
let request = require("request");
// to import code from any other file

let match = require("./match");
console.log(match);
// html parsing , extract data
// to manipluate excel 
// will request for page from cricinfo server
function allMatchHandler(url) {

    request(url, cb);
}
console.log("Before");
function cb(err, header, body) {

    if (err == null && header.statusCode == 200) {
        console.log("Recieved resp");
        // console.log(body);
        processMatch(body);
        // fs.writeFileSync("file.html",body);
    } else if (header.statusCode == 404) {
        console.log("404 wrong url");
    } else {
        console.log(err);
        console.log(header.statusCode);
    }
}
function processMatch(html) {
    // parse
    let ch = cheerio.load(html);
    // cheerio to parse
    let allElem = ch(".col-md-8.col-16");
    for (let i = 0; i < allElem.length; i++) {
        let link = ch(allElem[i]).find("a[data-hover='Scorecard']").attr("href");
        let fullLink = "https://www.espncricinfo.com" + link;
        // console.log(fullLink);
        match.childFn(fullLink);
        // empty object
    }
    // let allAELem = ch("a[data-hover='Scorecard']")
    // for (let i = 0; i < allAELem.length; i++) {
    //     let link = ch(allAELem[i]).attr("href");
    //     console.log(link)
    // }

    // console.log(allCards.length);
    //  give command match.js
}
module.exports.allMatchHandler = allMatchHandler;