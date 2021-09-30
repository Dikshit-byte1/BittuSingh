var express = require("express");
var bodyParser  = require("body-parser");
var mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
var db = mongoose.connection;
db.on('error',()=>{
    console.log("Error in connecting to Database")
});
db.once('open',()=>{
    console.log("Connected to Database");
})
app.post("/sign_up",(req,res)=>{
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.mobile_number;
    var state = req.body.state;
    var subject = req.body.subject;

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "phone":phone,
        "state":state,
        "subject":subject
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully!!");
    });
    return res.redirect('signup_success.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on port 3000")