const express = require('express');

const port = 9000;

const app = express();

const db = require('./config/mongoose');

const jwtData = require('./config/passport-jwt-strategy');

app.use(express.urlencoded());

app.use('/',require('./routes'))

app.listen(port,(err)=>{
    if(err){
        console.log("server not start");
    }
    console.log("server is start");
});