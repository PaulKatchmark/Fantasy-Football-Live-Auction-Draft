angular.module('auctionApp')
 .controller('LeagueController', ['$location', 'SetupService', function ($location, SetupService) {
   console.log('LeagueController loaded');
   var vm = this;
   vm.data = SetupService.data;

   var navBarTeams= function() {
     vm.signedInAs = true;
     vm.signOut = true;
     vm.leagueTab = true;
     vm.draftTab = true;
     vm.settingsTab = false;
   }

   navBarTeams();
   console.log('signedInAs ', vm.signedInAs);

    }]);
