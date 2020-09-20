// requre
let fs = require("fs");
// fn call
// ds code 
// //  this not the natural way of using nodejs/browser
// let data = fs.readFileSync("f1.txt");
// console.log("Data " + data);
// data = fs.readFileSync("f2.txt");
// console.log("Data " + data);
// // use
// async 
// serial
fs.readFile("f1.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Data is " + data);
        fs.readFile("f2.txt", function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("Data is " + data);

            }
        })
    }
})
// Parallel
fs.readFile("f1.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Data is " + data);
        
    }
})

fs.readFile("f2.txt", function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log("Data is " + data);

    }
})