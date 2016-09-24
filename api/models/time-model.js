const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TimeSchema = new Schema({
    user: {type: String, required: true},
    date: {type: String, required: true},
    spentTime: {type: String, required: true},
    note: {type: String, required: true}
})

module.exports = mongoose.model('Time', TimeSchema);
