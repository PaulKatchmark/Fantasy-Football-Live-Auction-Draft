angular.module('auctionApp')
 .controller('SettingsController', ['$location', 'SetupService', function ($location, SetupService) {
   console.log('SettingsController loaded');
   var vm = this;
   vm.numTeams = [8,10,12,14,16];
   vm.auctionAmount = [100, 150, 200, 250, 300, 350, 400];
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
   vm.setLeague = false;
   vm.teamSet = false;

   vm.league = {
     auctionAmount: 0,
     numTeams: 0
   }

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
    // SetupService.getPPR();
  };
  vm.createLeague = function (){
    console.log('controller setUpLeague ', vm.setUpLeague.model.value);
    console.log('controller league ', vm.league);
    console.log('controller teamsize', vm.team);
    //value for API call
    SetupService.data.setUpLeague = vm.setUpLeague.model.value;
    // auction value and number of teams
    SetupService.data.league = vm.league;
    //number of positions
    SetupService.data.team = vm.team;
    SetupService.setTeamInfo();
    $location.path('/home');

  };
  // vm.setTeams.push(vm.setQB);

  // console.log('setTeams ', setTeams);







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
