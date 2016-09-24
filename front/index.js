'use strict';

const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    app = express();

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/views')

var apiRoutes = require('./app/routes/routes')(app, express);
app.use('/', apiRoutes);

app.listen(9001, function() {
    console.log(' The app is up on port: ', 9001);
});
