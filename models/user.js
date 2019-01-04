// var mongoose = require('mongoose');
// const mongoUrl = 'mongodb://localhost:27017/testtwo';
// mongoose.connect(mongoUrl,{useNewUrlParser: true});

var crypto = require('crypto');

var mongoose = require('../lib/mongoose');
var  Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword:{
        type: String,
        required: true
    },
    salt:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function(password){
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
.set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
})
.get(function(){ return this._plainPassword;});

schema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
};
//
// schema.static.authorize = function(username, password, callback){
//     var User = this;
//
// }
// var app = mongoose.model('User', schema);
// console.log('--------------------------');
// console.log(app);
// console.log('--------------------------');

module.exports = mongoose.model('User', schema);