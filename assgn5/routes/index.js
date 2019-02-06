var express = require('express');
var passport = require('passport');
var multer = require('multer');
var Account = require('../models/account');
var router = express.Router();

var upload = multer({ dest: 'public/images/' });
var fs = require('fs');

router.get('/', function(req, res) {
    var hasLogin = (req.user)?true:false;
    res.render('index', {hasLogin:hasLogin, user : req.user });
});

router.get('/login', function(req, res) {
    res.render('login', { hasLogin:false,user : req.user, error : req.flash('error')});
});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res, next) {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.setHeader('session',req.body.username);
        res.redirect('/');
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/register', function(req, res) {
  res.render('register', { hasLogin:false});
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }
        passport.authenticate('local')(req, res, function() {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.setHeader('session',req.body.username);
                res.redirect('/');
            });
        });
    });
});

router.post('/video/upload',upload.any(),function(req,res, next) {
    if(req.files) {
        req.files.forEach(function(file){
            fs.rename(file.path,'public/images/'+file.originalname, function(err){
               if(err) throw err;
               res.send('hhhh');
            });
        }); 
    }
});

module.exports = router;
