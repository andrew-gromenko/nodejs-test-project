const express = require('express'),
      auth = require('../middlewares/authenticate');

module.exports = function() {
    var router = express.Router();

    router.route('/')
        .get(auth.loginCheck, function(req, res) {
          res.render('index.ejs');
        })

    router.route('/sign-in')
        .get(auth.loginCheck, function(req, res) {
          res.render('templates/sign-in.ejs');
        })

    router.route('/sign-up')
        .get(auth.loginCheck, function(req, res) {
          res.render('templates/sign-up.ejs');
        })

    router.route('/create')
        .get(auth.authCheck, function(req, res) {
          res.render('templates/create-time.ejs');
        })

    router.route('/list')
        .get(auth.authCheck, function(req, res) {
          res.render('templates/list-time.ejs');
        })
    router.route('/edit')
        .get(auth.authCheck, function(req, res) {
          res.render('templates/edit-time.ejs');
        })

    return router;
}
