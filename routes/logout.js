const router = require('express').Router();
const passport = require('passport');
var pool = require('../db/connection');
var pg = require('pg');


router.get('/', function (req, res){
  console.log('logging out');
    req.logOut();
    res.redirect('/');
})

module.exports = router;
