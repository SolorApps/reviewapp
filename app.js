var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var restaurantController = require('./controller/restaurant');
var app = express();
// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reviewapp');
    // mongoose.connect(config.getDbConnectionString());
    mongoose.connection
    .once('open', () => {console.log('connected to database');})
    .on('error', (error) => {
        console.log(error);
        console.warn('Warning', error);
    });


// Create our Express router
var router = express.Router();
router.route('/default')
    .get(restaurantController.createDefault);

app.use('/api', router);

app.get('/', function(req, res, next){
    res.send('my web server');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 3000
app.listen(port);