// const { head } = require("request");
let fs = require("fs");
// npm 
let request = require("request");
let cheerio = require("cheerio");
let url = "https://www.espncricinfo.com/series/8048/scorecard/1181768/mumbai-indians-vs-chennai-super-kings-final-indian-premier-league-2019";
// html parsing , extract data
// to manipluate excel 
// will request for page from cricinfo server
request(url, cb);
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
// console.log("After");
function processMatch(html) {
    // parse
    let ch = cheerio.load(html);
    // let detailsElement = ch(".desc.text-truncate");
    // .card.content-block.match-scorecard-table .Collapsible
    // innings
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    //  inning loop 
    for (let i = 0; i < bothInnings.length; i++) {
        // get team name
        let teamNameElem = ch(bothInnings[i]).find(".header-title.label");
        let teamName = teamNameElem.text().split("Innings")[0].trim();
        // batsman table => batsman rows
        let allRows = ch(bothInnings[i]).find(".table.batsman tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            // filter batsman rows
            let isBastman = ch(ch(allRows[j]).find("td")[0]).hasClass("batsman-cell");
            // let isBastman = ch(allRows[j]).find(".batsman-cell").length;
            if (isBastman) {
                // bastman rows handle
                let pName = ch(ch(allRows[j]).find("td")[0]).text().trim();
                let runs = ch(ch(allRows[j]).find("td")[2]).text();
                let balls = ch(ch(allRows[j]).find("td")[3]).text();
                let fours = ch(ch(allRows[j]).find("td")[5]).text();
                let sixes = ch(ch(allRows[j]).find("td")[6]).text();
                let sr = ch(ch(allRows[j]).find("td")[7]).text();
                console.log(`${teamName} ${pName} ${runs} ${balls} ${fours} ${sixes} ${sr}`)
                // get details of a batsman
                // console.log(pName);
            }
        }

        // console.log(noBatsman);
        //    let arrofString= teamName.
        //    console.log(arrofString);
        console.log("```````````````````````````");
        console.log(teamName);
        // get data of batsman of that team 


    }
    // fs.writeFileSync("innings.html", bothInnings);

    // console.log("File saved");
    // console.log(detailsElement);
    // let dt = detailsElement.text();
    // console.log(dt);
    // required extract 
    // team ,player Name, runs, balls,sr,opponent
    //  send the data to a fn that add the extracted data to excel
}


// later 
function processPlayer(details) {
    // will save the data to file system
}