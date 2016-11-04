// var router = require('express').Router();
// var request = require('request');
// require('dotenv').config();
// var values={};
// var players=[];
// router.get('/', function(req, res){
//     getPlayers();
//     res.sendStatus(200);
// });
// router.get('/players', function(req, res){
//   res.send(players);
// })
// function getPlayers(){
//   request("http://www.fantasyfootballnerd.com/service/auction/json/"+process.env.keyId+"/ppr/",
//   function(err, res, body){
//     var rankedplayers=[];
//     if(err){
//       console.log('request rank error', err);
//     }
//     else{
//       values=JSON.parse(body);
//       players=values.AuctionValues;
//     }
//   })
// }
//
//
// module.exports = router;
