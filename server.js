'use strict';



var express = require('express');
var moment = require('moment');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

var app = express();

app.route('/')
    .get(function(req, res) {
      res.sendFile(process.cwd() + '/index.html');
    });


var port = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/:timestamp', function(req,res){
	
	var time = moment(req.params.timestamp, "MMMM DD, YYYY", true);
	
	if(!time.isValid()){
        time = moment.unix(req.params.timestamp);
	}
	if(!time.isValid()){
		res.json({
			'humanReadable': null,
			'unix': null
		});
	}
	
	res.json({
			'humanReadable': time.format("MMMM D, YYYY"),
			'unix': time.format("X")
		});
	
	
});

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});