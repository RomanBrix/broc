const mongoUrl = 'mongodb://localhost:27017/brocompany';
var mongoose = require('mongoose');


mongoose.connect(mongoUrl,{useNewUrlParser: true, useCreateIndex: true});

module.exports = mongoose;