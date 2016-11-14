angular.module('auctionApp')
 .controller('DraftController', ['$location', 'SetupService', function ($location, SetupService) {
   console.log('DraftController loaded');
   var vm = this;
   vm.data = SetupService.data;
   vm.numberArray = [0,1,2,3,4,5,6,7,8];
  //  //add search and sort options to full player list
  //  vm.sortType = 'displayname';
  //  vm.sortReverse = false;
  //  vm.searchPlayer = '';

  //  vm.data.setUpLeague;
  //  vm.data.league = {};
  // //  vm.data.team = {};
  // //  vm.data.auctionAmount = [];
  //  vm.data.setTeams = [];
  //  vm.data.teamSet;
   console.log('DraftController team ', vm.data.team);
   console.log('DraftController league.auctionAmount ', vm.data.league.auctionAmount);
  //  console.log('DraftController setTeams ', vm.data.setTeams);
   console.log('DraftController leage ', vm.data.league);
   console.log('DraftController setUpLeague ', vm.data.setUpLeague);
  //  console.log('DraftControllerteamSet ', vm.data.teamSet);
  console.log('DraftController players ', vm.data.players);
  // vm.array.push(angular.copy(vm.data.team));
 }]);
 //
 // vm.getPPR = function(nflPlayers){
 //   SetupService.getPPR(nflPlayers)
 //   .then(function(response){
 //     console.log('getPPR response ', response );
 //   })
 // };
