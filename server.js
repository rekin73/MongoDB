var http = require("http");
var qs = require("querystring");
var fs = require("fs");
var mongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var Operations = require("./modules/Operations.js")
var _db;
var opers = new Operations();
var servres = function (req, res) {
    var allData = "";
    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })
    req.on("end", function (data) {
        var finishObj = qs.parse(allData)
        var coll = _db.collection("usersi")
        switch (finishObj.akcja) {
            //dodanie nowego usera
case "addUser":
console.log(finishObj.login)
opers.Insert(coll,{user:finishObj.login,password:finishObj.password})
break;
case "refreshUser":

break;
case "deleteUser":

break;
case "updateUser":

break;

            case "INNA_AKCJA":
                console.log("inna akcja")
                break;
        }
    })



}
var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            console.log("żądany przez przeglądarkę adres: " + req.url)
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }

            else if (req.url === "/style.css") {
                fs.readFile("static/css/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/script.js") {
                fs.readFile("static/js/script.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
        case "POST":
            // tu wywołaj funkcję "servResponse", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)

            servres(req, res)

            break;

    }



})





server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});

mongoClient.connect("mongodb://localhost/3ib1", function (err, db) {
    if (err) console.log(err)
    else console.log("mongo podłączone")
    //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt
    db.createCollection("zad1", function (err, coll) {
        
        coll.insert({a:1}, function (err, result) {                
            console.log(result)
         });
         console.log(coll)
     }) 
     var data =
{
   a: "1",
   b: "2",
};

var coll = db.collection("usersi")
opers.Insert(coll, data)
//opers.SelectAll(coll)
//opers.DeleteById(ObjectID, coll, "5b0520412b966c0d9cd900af")
opers.SelectAndLimit (coll,function (data) {            
    //console.log("SAL")
    console.log(data)
})
    // pod zmienną widoczną na zewnątrz    
    _db = db;
})
