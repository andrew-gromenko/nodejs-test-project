const Time = require('../models/time-model')

module.exports = {

    addTime: function(req, res) {
        var time = new Time();

        time.user = req.body.user;
        time.date = req.body.date;
        time.spentTime = req.body.spentTime;
        time.note = req.body.note;
        time.save(function(data) {
            console.log(data);
        });
        res.send(200);
    },

    editTime: function(req, res) {
        Time.findById(req.params.time_id, function(err, time) {
            time.date = req.body.date;
            time.spentTime = req.body.spentTime;
            time.note = req.body.note;
            time.save();
            res.send(200);
        })
    },

    getTime: function(req, res) {
        Time.find({
            'user': req.params.user_name
        }, function(err, userTime) {
            if (err) res.send(err);
            res.json(userTime);
        });
    },

    getEditTime: function(req, res) {
      Time.findById(req.params.time_id, function(err, time) {
          if (err) res.send(err);
          res.json(time);
      })
    },

    deleteTime: function(req, res) {
        Time.remove({
            _id: req.params.time_id
        }, function(err) {
            if (err) throw err
            res.send(200);
        })
    }
}
