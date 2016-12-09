const router = require('express').Router();
const passport = require('passport');
var pool = require('../db/connection');
var pg = require('pg');

router.get('/:username', function(req, res) {
  console.log('username ', req.params.username);
  username = req.params.username;
pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }

            client.query('SELECT firstname FROM users WHERE username = $1',[username], function(err, result) {
            if (err) {
                console.log('Error querying the DB', err);
                res.sendStatus(500);
                return;
            }

            console.log('Got rows from the DB:', result.rows);
            res.send(result.rows);
            });
      } finally {
    done();
}
});
});

router.post('/', passport.authenticate('local'), function(req, res){
  res.sendStatus(200);
});

module.exports = router;
