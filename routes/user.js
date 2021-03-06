var router = require('express').Router();
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');


router.get('/login', function (req, res, next) {
    if (req.user) return res.redirect('/');
    res.render('accounts/login', { message: req.flash('loginMessage') });
});

router.get('/profile', function (req, res) {
    res.render('accounts/profile', { user: req.user });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', function (req, res, next) {
    res.render('accounts/signup', { errors: req.flash('errors') });
}
);

router.post('/signup', function (req, res, next) {
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    
    User.findOne({ email: user.email }, function (errf, existingUser) {
     
        if (existingUser)
        {
            req.flash('errors', 'Account with that email already exists!');
            return res.redirect('/signup');   
        }  
        else {
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                else {
                    return res.redirect('/');
                }
            });
        }  
              
    });
    
});


router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});


module.exports = router;