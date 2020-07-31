const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const _ = require("lodash");
const request = require('request');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
    res.render('login');
})

app.get("/homepage", function (req, res) {
    request('https://codeforces.com/api/problemset.problems?tags=dp', function (error, response, body) {
        if (error) {
            console.log("SOmething Wnt Wrong!!");
            console.log(error);
        }
        else {
            if (response.statusCode == 200) {
                //console.log(body);
                var data = JSON.parse(body);
                res.render('dashboard', { data: data["result"]["problems"] });
                //console.log(parsedData["result"]["problems"][0]);
            }
        }
    })
    //res.send("login");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("server started at 3000 port");
});
