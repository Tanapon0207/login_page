// first import install libery 

var express = require("express");
var bodyParse = require("body-parser");
var mongoose = require("mongoose");
const e = require("express");

//create app

const app = express()

app.use(bodyParse.json())
app.use(express.static('public'))
app.use(bodyParse.urlencoded({
    extended: true
}))

// conect database


mongoose.connect('mongodb://127.0.0.1:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;

// check connect

db.on('error', () => console.log("error in connecting database"));
db.once('open', () => console.log("Connected to Database"));


app.get("/", (req, res) => {

    res.set({
        "Allow-access-Allow-Origin": '*'
    })

    return res.redirect('index.html');

}).listen(4000);

app.post("/register", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var position = req.body.position;
    
    var data = {
        "username": username,
        "password": password,
        "position": position
        
    }
    db.collection('data').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_s.html');

});

app.post("/login", async (request, response) => {
    try {
        //adding
        const username = request.body.username;
        const password = request.body.password;

        const usermail = db.collection('data').findOne({ username: username }, (err, res) => {
            if (res == null) {
                
                return response.redirect('sign_up.html');
                
            }
            else if (err) throw err;


            if (res.password === password) {
                //return response.redirect('login_s.html');
                return response.redirect('logout.html');
                
            }
            else {
                return response.redirect('sign_up.html');
            }


        });
    }
    catch (error) {
        return response.redirect('sign_up.html');
    }



});

