angular.module('auctionApp')
 .controller('SettingsController', ['$location', 'DataService', function ($location, DataService) {
   console.log('SettingsController loaded');
   var vm = this;
   vm.numTeams = [6,7,8,9,10,11,12,13,14,15,16,17,18];
   vm.auctionAmount = [100, 150, 200];
   vm.quarterBacks = [1,2];
   vm.runningBacks = [2,3];
   vm.wideReceivers = [2,3];
   vm.tightEnds = [1,2];
   vm.flexSpot = [0,1,2];
   vm.kicker = [0,1];
   vm.defense = [0,1];
   vm.benchSpots = [2,3,4,5,6,7,8];
   vm.setTeams = [0,1,2,3,4,5,6,7,8];
   vm.teamsDone = false;
   vm.setQB = 0;
   vm.setLeague = false;
   vm.teamSet = false;

   vm.team = {
     quarterBacks: 0,
     runningBacks: 0,
     wideReceivers: 0,
     tightEnds: 0,
     flexSpot: 0,
     kicker: 0,
     defense: 0,
     benchSpots: 0
   }

   vm.setUpLeague = {
    model: null,
    availableOptions: [
      {value: 1, name: 'PPR'},
      {value: 0, name: 'Standard'}
    ]
  };

  vm.hideShow = function() {
    vm.setLeague = true;
    console.log('vm.setLeague ',vm.setLeague);
    vm.teamSet = true;
  };
  vm.createTeamSize = function (team){
    console.log('setQB ', vm.setQB);
    console.log('quarterBacks ', vm.quarterBacks);
    console.log('setRB ', vm.setRB);
  };

// vm.addTeams = function (){
//   if (vm.newTeams>0) {
//     for (i = 0; i < vm.newTeams; i++ ){
//       vm.totalTeams.push("team" + (i+1));
//       console.log(totalTeams);
//     }
//     vm.teamsDone = true;
//   }
// }

// vm.searchAndDisplayValues = function (){
//   if(vm.totalTeams.length === 0){
//     vm.addTeams();
//   }
// }

}]);
