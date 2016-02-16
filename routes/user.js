var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function (req, res, next) {
    res.render('accounts/signup', { errors: req.flash('errors') });
}
);

router.post('/signup', function (req, res, next) {
    var user = new User();
    user.name = req.body.name;
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


module.exports = router;