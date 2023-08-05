const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser")
const encoder = bodyParser.urlencoded();


const app = express();
app.use("/assets", express.static("assets"))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodejs"
});

//connect to database

connection.connect(function(error) {
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/indexoflogin.html");
})

app.post("/", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    // console.log("variables", username, ',', password)
    // console.log(`select * from loginuser where user_name = '${username}' and user_pass = '${password}'`)
    connection.query(`select * from loginuser where user_name = '${username}' and user_pass = '${password}'`, function(error, results, fields) {
        // console.log(results.length)
        // console.log(results)

        if (results.length > 0) {
            res.redirect("http://127.0.0.1:5502/index.html");
        } else {
            res.redirect("/");
        }
        res.end();
    })

    // connection.query(`select * from loginuser where user_name = '${username}' and user_pass = '${password}'`, (error, result, fields) => {
    //     console.log(result)

    // })


})

// when login is success
app.get("http://127.0.0.1:5502/index.html", function(req, res) {
    res.sendFile("http://127.0.0.1:5502/index.html")
})


// set app port 
app.listen(4000);