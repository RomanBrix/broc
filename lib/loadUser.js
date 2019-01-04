var User = require('../models/user');

module.exports = function (req, res, next) {
    // console.log(req.session.user);
    req.user = null;
    if(! req.session.user) return next();

    User.findById(req.session.user, function (err, usr) {
        if (err) return next(err);

        req.user = usr;
        next();
    })
};