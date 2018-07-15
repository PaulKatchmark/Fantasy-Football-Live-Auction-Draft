// DO NOT NEED UNTIL NEXT SEASON, USING DB FOR ALL REQUESTS


// var router = require('express').Router();
// var pg = require('pg');
// var assert = require('chai').assert;
// var FFNerd = require('fantasy-football-nerd');
// require('dotenv').config();
// var ff = new FFNerd({ api_key: process.env.keyId });
// var players;

// var config = {
//   database: 'rho',
// };
// function getPlayers() {

//   ff.auction(1, function(auction) {
//       console.log('auction ', auction);
//       players = auction;
//       angular.forEach(players, function(player, res) {
//         pool.connect(function(err, client, done) {
//           if(err) {
//             done();
//             next(err);
//           }
//           client.query('INSERT INTO ppr_2016 (displayname, team, pos, team_12) ' +
//         'VALUES($1, $2, $3, $4)', [player.displayName, player.team, player.position, player.avgPrice],
//           function(err, result) {
//             done();
//             if(err) {
//               console.log(err);
//               return res.sendStatus(500);
//             }
//             res.sendStatus(201)
//           });
//         });
//       });
//   });
  
//   ff.byes(function(byes) {
//     console.log('byes ', byes);
//    });
// };


// module.exports = router;
