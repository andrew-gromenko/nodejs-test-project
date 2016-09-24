'use strict';

const express = require('express'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

mongoose.connect(config.database);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

var apiRoutes = require('./routes/routes')(app, express);
app.use('/', apiRoutes);

app.listen(config.port, function() {
    console.log(' The app is up on port: ', config.port);
});
