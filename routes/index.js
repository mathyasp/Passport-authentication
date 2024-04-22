const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');




// Define routes.

// home route
router.get('/',
    (req, res) => {
        res.render('home', { user: req.user });
    });

// route to display login form
router.get('/login',
    (req, res) => {
        res.render('login');
    });
// Route to submit login form. It uses passport.authenticate
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    });

// TODO: Complete route to logout of passport session    
router.get('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        res.redirect('/');
    });

// Github route
router.get('/auth/github',
    passport.authenticate('github'));
    
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/profile');
  });    
});


// connectEnsureLogin acting as route guard to make sure the routes can't be accessed if not logged in
router.get('/profile',
    connectEnsureLogin.ensureLoggedIn(),
    (req, res) => {
        res.render('profile', { user: req.user });
    });

module.exports = router;