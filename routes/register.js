const router = require('express').Router();
const User = require('../models/user');

router.post('/', function(req, res) {
  console.log('registering new user');
  User.create(req.body.firstName, req.body.lastName, req.body.username, req.body.password).then(function() {
    res.sendStatus(201);
  }).catch(function(err){
    console.log('Error in /register', err);
    res.sendStatus(500);
  });
});

module.exports = router;
