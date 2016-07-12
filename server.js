///*
// BASE SETUP
//=============================================================================

//call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

//SEQUELIZE
//=============================================================================
var sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/auremdb');

// MODELS
var models = require(__dirname, "../models");
//console.log(models);
//var restaurant = require(__dirname, "../models/restaurant");
//console.log("Restaurant: ");
//console.log(restaurant);


//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

//ROUTES FOR OUR API
//=============================================================================

// router to /health in openshift cloud
var router2 = express.Router();

//middleware to use for all requests
router2.use(function(req, res, next) {
    // do logging
    console.log('Request received in router2!!');
    next(); // make sure we go to the next routes and don't stop here
});

router2.get('/', function(req, res) {
	res.json({message: 'welcome to router2'});
});

// IMPORTANT: Your application HAS to respond to GET /health with status 200
//            for OpenShift health monitoring

router2.route('/health')
	.get(function(req, res) {
		res.writeHead(200);
		res.end();
});


var router = express.Router();              // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Request received in router1!!');
  next(); // make sure we go to the next routes and don't stop here
});

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

//on routes that end in /restaurant
//----------------------------------------------------
router.route('/restaurant')
	// create a bear (accessed at POST http://localhost:8080/api/restaurant)
	.post(function(req, res) {

	     var restaurant = new Restaurant();      // create a new instance of the Restaurant model
	     bear.name = req.body.name;  // set the restaurant name (comes from the request)

	     // save the restaurant and check for errors
	     bear.save(function(err) {
	         if (err)
	             res.send(err);

	         res.json({ message: 'Restaurant created!' });
	     });
});

//REGISTER OUR ROUTES -------------------------------
//all of our routes in router1 will be prefixed with /api
app.use('/api', router);

//all of our routes in router2 will be prefixed with /
app.use('/', router2);


//START THE SERVER
//=============================================================================
app.listen(port);

//models.sequelize.sync().then(function () {
//	var server = app.listen(app.get('port'), function() {
//		debug('Express server listening on port ' + server.address().port);
//  	});
//});

console.log('Magic happens on port ' + port);

