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
    //console.log('inside editDollars function ', item)
    SetupService.editDollars(team, item);
  }
  vm.doneEditing = function(item) {
    //send new amount back and change editing back to false
    //team.paid will be the value edited.
    //console.log('inside doneEditing team', team)
    //console.log('inside doneEditing function ', item)
    SetupService.doneEditing(item);
    vm.newValue = '';
  }
  navBarTeams();
  console.log('signedInAs ', vm.signedInAs);
}]);
