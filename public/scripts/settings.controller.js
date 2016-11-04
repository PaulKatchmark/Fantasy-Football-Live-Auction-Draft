angular.module('auctionApp')
 .controller('SettingsController', SettingsController);

 function SettingsController($http, $location) {
   console.log('SettingsController loaded');
   var vm = this;
   vm.numTeams = [6,7,8,9,10,11,12,13,14,15,16,17,18];
   vm.auctionAmount = [100, 150, 200];
   vm.quarterBacks = [1,2];
   vm.runningBacks = [2,3];
   vm.wideReceivers = [2,3];
   vm.tightEnds = [1,2];
   vm.flexSpot = [0,1];
   vm.kicker = [1];
   vm.defense = [1];
   vm.benchSpots = [2,3,4,5,6,7,8];
   vm.totalTeams = [];
   vm.teamsDone = false;

   vm.setUpLeague = {
    model: null,
    availableOptions: [
      {value: 1, name: 'PPR'},
      {value: 0, name: 'Standard'}
    ]
  };

  vm.addTeams = function (){
    if (vm.newTeams>0) {
      for (i = 0; i < vm.newTeams; i++ ){
        vm.totalTeams.push("team" + (i+1));
        console.log(totalTeams);
      }
      vm.teamsDone = true;
    }
  }

vm.searchAndDisplayValues = function (){
  if(vm.totalTeams.length === 0){
    vm.addTeams();
  }
}



};
