const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Welcome Page
router.get('/welcome', (req, res) => {
  res.render('welcome');
});

// Register Page
router.get('/register', (req, res) => {
  res.render('register');
});

// Register Handler
router.post('/register', async (req, res) => {
  try{
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    await newUser.save();
    res.redirect('/login');

  } catch (err) {
    console.error('Registration error:', err);
    res.redirect('/register');
  }
})


// Login Page 
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', passport.authenticate('local', {
  successRedirect: '/welcome',
  failureRedirect: '/login'
}));


// Logout Handler 
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;


