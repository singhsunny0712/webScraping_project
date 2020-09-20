// const { head } = require("request");
// node core modules
let fs = require("fs");
let path = require("path");
// npm 
// request
let request = require("request");
// parsing
let cheerio = require("cheerio");
// excel
let xlsx = require("xlsx");
// let url = "https://www.espncricinfo.com/series/8048/scorecard/1181768/mumbai-indians-vs-chennai-super-kings-final-indian-premier-league-2019";
// html parsing , extract data
// to manipluate excel 
// will request for page from cricinfo server
function scrapAMatch(url) {
    // async function=> parallel work
    request(url, cb);

}
// console.log("Before");
function cb(err, header, body) {

    if (err == null && header.statusCode == 200) {
        // console.log("Recieved resp");
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
    let detailsElement = ch(".desc.text-truncate");
    // .card.content-block.match-scorecard-table .Collapsible
    // innings
    // console.log(detailsElement.text());
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
                // console.log(`${teamName} ${pName} ${runs} ${balls} ${fours} ${sixes} ${sr}`)
                processPlayer(teamName, pName, runs, balls, sixes, fours, sr);
                // get details of a batsman
                // console.log(pName);
            }
        }

        // console.log(noBatsman);
        //    let arrofString= teamName.
        //    console.log(arrofString);
        // console.log("```````````````````````````");
        // console.log(teamName);
        // get data of batsman of that team 


    }
    // console.log("###############################");
    // fs.writeFileSync("innings.html", bothInnings);

    // console.log("File saved");
    // console.log(detailsElement);
    // let dt = detailsElement.text();
    // console.log(dt);
    // required extract 
    // team ,player Name, runs, balls,sr,opponent
    //  send the data to a fn that add the extracted data to excel
}
function excelReader(filePath, name) {
    if (!fs.existsSync(filePath)) {
        return null;
    }
    // workbook => excel
    let wt = xlsx.readFile(filePath);
    // get data from workbook
    let excelData = wt.Sheets[name];
    // convert excel format to json => array of obj
    let ans = xlsx.utils.sheet_to_json(excelData);
    // console.log(ans);
    return ans;
}
function excelWriter(filePath, json, name) {
    // console.log(xlsx.readFile(filePath));
    var newWB = xlsx.utils.book_new();
    // console.log(json);
    var newWS = xlsx.utils.json_to_sheet(json)
    xlsx.utils.book_append_sheet(newWB, newWS, name)//workbook name as param
    xlsx.writeFile(newWB, filePath);
}
// add data to file system
function processPlayer(team, name, runs, balls, sixes, fours, sr) {
    //    directory exist
    // [{},{}]
    let obj = {
        runs, balls, fours, sixes, sr, team
    };
    let teamPath = team;
    // check if dir name Mumbai indian exist
    if (!fs.existsSync(teamPath)) {
        fs.mkdirSync(teamPath);
    }
    // Mumbai Indians/RSharma.xlsx
    let playerFile = path.join(teamPath, name) + '.xlsx';
    // excel code read => no file
    let fileData = excelReader(playerFile, name);
    let json = fileData;
    if (fileData == null) {
        json = [];
    }
    json.push(obj);
    // excel write
    excelWriter(playerFile, json, name);
}

module.exports.childFn = scrapAMatch;
// module.exports.val=4;
