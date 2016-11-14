angular.module('auctionApp')
.service('SetupService',['$http', function($http){
  var data = {};
  var vm = this;
  data.setUpLeague;
  data.league = {};
  data.team = {};
  data.auctionAmount = [];
  data.setTeams = [];
  data.teamSet;
  var players;

//add search and sort options to full player list
data.sortType = 'teams_8';
data.sortReverse = true;
data.searchPlayer = '';


    //function to get full players list from DB
  function getPPR(){
    var sendData = {};
    sendData.teams = data.league.numTeams
    console.log('sendData ', sendData);
    console.log('sendData.teams ', sendData.teams);
    $http.get('/ppr').then(function(response) {
      console.log('response ', response.data);
      data.players = response.data;
    });
  }


  function setTeamInfo() {
    getPPR();
  console.log('service setUpLeague ', data.setUpLeague);
  console.log('service league ', data.league);
  console.log('service team ', data.team);
  console.log('Service TEST ', data.league.numTeams);
  };

return {
  data: data,
  setTeamInfo: setTeamInfo,
  getPPR: getPPR
}
}]);
