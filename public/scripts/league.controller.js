angular.module('auctionApp')
.controller('LeagueController', ['SetupService', function (SetupService) {
  console.log('LeagueController loaded');
  var vm = this;
  vm.data = SetupService.data;
  vm.newValue;
  vm.firstname;
  vm.firstname = SetupService.data.firstname;
  
  var navBarTeams= function() {
    vm.signedInAs = true;
    vm.signOut = true;
    vm.leagueTab = true;
    vm.draftTab = true;
    vm.settingsTab = false;
  }

  vm.logout = function() {
    SetupService.logout();
  };

  vm.editDollars = function(team, item) {
    //trigger function on service to change player editing to true
    //team.paid is what will change
    item.editing = true;
    SetupService.editDollars(team, item);
  }

  vm.doneEditing = function(item) {
    //send new amount back and change editing back to false
    //team.paid will be the value edited.
    SetupService.doneEditing(item);
    vm.newValue = '';
  }

  vm.undraftPlayer = function (team, item) {
    SetupService.undraftPlayer(team, item);
  }

  vm.movePlayer = function(team, item) {
    console.log('inside undraft function: team is', team);
    console.log('inside undraft function: item is', item);
    item.transfer = true;
    // SetupService.movePlayer(team, item);
  }

  navBarTeams();
  console.log('signedInAs ', vm.signedInAs);
}]);
