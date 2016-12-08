var router = require('express').Router();
var pg = require('pg');
var pool = require('../db/connection')


router.get('/:teamCol', function(req, res) {
pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }

            client.query('SELECT id, displayname, team, pos, byeweek, ' + req.params.teamCol + ' FROM ppr_2016', function(err, result) {
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
module.exports = router;
