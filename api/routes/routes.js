const express = require('express'),
    userCntrl = require('../controllers/user-controller'),
    timeCntrl = require('../controllers/time-controller');

module.exports = function() {
    var router = express.Router();

    router.route('/')
        .get(userCntrl.getAllUsers)

    router.route('/sign-up')
        .post(userCntrl.createUser)

    router.route('/sign-in')
        .post(userCntrl.loginUser)

    router.route('/time')
        .post(timeCntrl.addTime)

    router.route('/time-list/:user_name')
        .get(timeCntrl.getTime)

    router.route('/time/:time_id')
        .delete(timeCntrl.deleteTime)
        .put(timeCntrl.editTime)
        .get(timeCntrl.getEditTime)

    return router;
}
