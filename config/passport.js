var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// Serialize and deserialize
passport.serializeUser(function (user, done) {
   done(null, user._id); 
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
       done(err, user); 
    });
});

//Middleware
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true        
}, function (req, email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) return done(err);
        
        if (!user)
        {
            return done (null, false, req.flash('LoginMessage', 'No user has been found.'))
        }
        
        if (!user.comparePassword(password)){
            return done (null, false, req.flash('LoginMessage', 'Oops! Wrong Password pal'))
        }
                
        return done (null, user);        
    });
}));


//Custom function to validate
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
};