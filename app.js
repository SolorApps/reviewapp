var express = require('express');
const mongoose = require('mongoose');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reviewapp');
    // mongoose.connect(config.getDbConnectionString());
    mongoose.connection
    .once('open', () => {console.log('connected to database');})
    .on('error', (error) => {
        console.log(error);
        console.warn('Warning', error);
    });

var port = process.env.PORT || 3000

app.get('/', function(req, res, next){
    res.send('my web server');
});

app.listen(port);