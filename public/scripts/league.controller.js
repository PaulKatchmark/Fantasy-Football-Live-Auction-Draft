angular.module('auctionApp')
.controller('LeagueController', ['SetupService', function (SetupService) {
  console.log('LeagueController loaded');
  var vm = this;
  vm.data = SetupService.data;
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
  navBarTeams();
  console.log('signedInAs ', vm.signedInAs);
}]);
