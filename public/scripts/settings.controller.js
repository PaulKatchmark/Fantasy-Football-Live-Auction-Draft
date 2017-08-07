angular.module('auctionApp')
.controller('SettingsController', ['$location', 'SetupService', function ($location, SetupService) {
  //  console.log('SettingsController loaded');
  var vm = this;
  vm.firstname;
  vm.numTeams = [8,10,12,14,16];
  vm.teamNames = [];
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
  vm.showDiv = false;
  vm.placeholderName = [];

  var navBarSettings = function() {
    vm.signedInAs = true;
    vm.signOut = true;
    vm.leagueTab = false;
    vm.draftTab = false;
    vm.settingsTab = false;
  }

  vm.logout = function() {
    SetupService.logout();
   };

  console.log('firstname ', SetupService.data.firstname);
  vm.firstname = SetupService.data.firstname;
  navBarSettings();
  console.log('signedInAs ', vm.signedInAs);

  vm.league = {
    auctionAmount: 0,
    numTeams: 0
  }

  vm.team = [{
    quarterBacks: 0,
    runningBacks: 0,
    wideReceivers: 0,
    tightEnds: 0,
    flexSpot: 0,
    kicker: 0,
    defense: 0,
    benchSpots: 0
  }];

  vm.setUpLeague = {
    model: null,
    availableOptions: [
      {
        value: 1,
        name: 'PPR'
      },
      {
        value: 0,
        name: 'Standard'
      }
    ]
  };

  vm.changedValue = function(item) {
    //$scope.itemList.push(item.name);
    console.log('number of teams selected ', item);
    //console.log(vm.league.numTeams)
    vm.placeholderName = [];
    if (item > 0) {
      vm.showDiv = true
      for (i = 0; i < vm.league.numTeams; i++) {
        var tempName = "team " + (i+1);
        vm.placeholderName.push(tempName)
        //console.log(vm.placeholderName)
      }
      return vm.placeholderName
    }
    else {
      vm.showDiv = false
    }
    // console.log('or item? ', vm.item);
  }    

  vm.hideShow = function() {
    vm.setLeague = true;
    // console.log('vm.setLeague ',vm.setLeague);
    vm.teamSet = true;


    for (i = 0; i < vm.placeholderName.length; i++) {
      if (typeof vm.teamNames[i] == 'undefined') {
        vm.teamNames[i] = 'team '+ (i+1)
      }
    }

  };

  vm.createLeague = function (){
    // console.log('controller setUpLeague ', vm.setUpLeague.model.value);
    console.log('controller league ', vm.league);
    console.log('controller teamsize', vm.team);
    console.log('team Names ', vm.teamNames)
    SetupService.data.customTeamNames = vm.teamNames;
    //value for API call
    SetupService.data.setUpLeague = vm.setUpLeague.model.value;
    // auction value and number of teams
    SetupService.data.league = vm.league;
    //number of positions
    SetupService.data.team = vm.team;
    SetupService.setTeamInfo();
    $location.path('/home');
  };

}]);
