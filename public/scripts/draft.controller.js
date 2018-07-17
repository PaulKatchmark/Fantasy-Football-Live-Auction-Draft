angular.module('auctionApp')
.controller('DraftController', ['SetupService', 'localStorageService', '$location', function (SetupService, localStorageService, $location) {
  //  console.log('DraftController loaded');
  var vm = this;
  vm.firstname;
  vm.data = SetupService.data;
  vm.data.amountPaid = "";
  vm.playerSelected = false;
  vm.selectedP;
  vm.selectedPlayer;
  vm.editing = false;
  vm.elementPos;
  vm.array;
  vm.firstname = SetupService.data.firstname;
  var projValue = 'teams_' + vm.data.league.numTeams;
  vm.searchTip = SetupService.data.searchTip;
  vm.tabTip = SetupService.data.tabTip;
  vm.draftTip = SetupService.data.draftTip;
  vm.showDraftTips = SetupService.data.showDraftTips;
  vm.logout = function() {
    SetupService.logout();
  };

  // SetupService.data.currentTeams = SetupService.getItem('currentTeams');
  // SetupService.data.totalTeams = SetupService.getItem('totalTeams')

  vm.tipOff = function(tip) {
    SetupService.tipOff(tip)
    vm.searchTip = SetupService.data.searchTip;
    vm.tabTip = SetupService.data.tabTip;
    vm.draftTip = SetupService.data.draftTip;
    vm.showDraftTips = SetupService.data.showDraftTips;
  }

  vm.tipsOn = function() {
    SetupService.tipsOn('draft')
    vm.searchTip = SetupService.data.searchTip;
    vm.tabTip = SetupService.data.tabTip;
    vm.draftTip = SetupService.data.draftTip;
    vm.showDraftTips = SetupService.data.showDraftTips;
  }

  vm.isActive = function (viewLocation) {
    console.log('is this working: ', viewLocation)
    return viewLocation === $location.path();
  };

  var navBarDraft= function() {
    vm.signedInAs = true;
    vm.signOut = true;
    vm.leagueTab = true;
    vm.draftTab = true;
    vm.settingsTab = false;
  }

   navBarDraft();
   console.log('signedInAs ', vm.signedInAs);

  //function used to select player upon click
  vm.selectPlayer = function(player){
    SetupService.data.ableToDraft === false
    SetupService.getItem('currentTeams')
    vm.array = [];
    SetupService.data.totalTeams = SetupService.getItem('totalTeams')
    vm.array = vm.data.players;
    vm.elementPos = vm.array.indexOf(player);
    vm.playerSelected = true;
    vm.selectedP=player;
    vm.selectedPlayer=SetupService.locatePlayer(player);
    // console.log('DraftController player ', vm.selectedP);
    if(player == vm.selectedPlayer){
      console.log("player ", player);
      // vm.selectedP = SetupService.locatePlayerOpposite(player);
    }
  }
  vm.sendPlayer = function($event){
    // console.log('amount paid for player ', vm.data.amountPaid);
    // console.log('the value of projValue ', projValue)
    // console.log('projected value of said player ', vm.data.draftedPlayer[projValue])
    if(vm.data.teamArray.auctionAmount >= vm.data.amountPaid) {
      // if (vm.data.amountPaid <= vm.data.draftedPlayer[projValue]) {
      //   // vm.data.draftedPlayer.myClass ("bargin")
      //   console.log('adding class of bargin')
      //   // vm.data.draftedPlayer.bargin = true;

      // } else {
      //   // vm.data.draftedPlayer.addClass("overpriced")
      //   console.log('adding class of overpriced')
      //   // vm.data.draftedPlayer.overpriced = true;
      // }
      SetupService.getItem('currentTeams')
      SetupService.data.ableToDraft === false
      SetupService.playerToTeam();
      console.log('LOOK HERE ', vm.data.currentTeams[0].team)
      if (SetupService.data.ableToDraft === true) {
        vm.data.amountPaid = "";
        vm.selectedP = "";
        vm.data.teamArray = "";
        vm.searchForPlayer = "";
        vm.playerSelected = false;
        vm.array.splice(vm.elementPos, 1);
        SetupService.submit('players', vm.data.players)
      } else {
        alert("Sorry, " + vm.data.teamArray.name + " doesn't have any roster spots left open.")
        vm.data.amountPaid = "";
        vm.data.teamArray = "";
        vm.searchForPlayer = "";
      }
    } else {
      alert("Sorry, " + vm.data.teamArray.name + " doesn't have enough money.")
      $event.preventDefault();
    }
  }
  //  vm.data.setUpLeague;
  //  vm.data.league = {};
  // //  vm.data.team = {};
  // //  vm.data.auctionAmount = [];
  //  vm.data.setTeams = [];
  //  vm.data.teamSet;
  //  console.log('DraftController team ', vm.data.team);
  //  console.log('DraftController league.auctionAmount ', vm.data.league.auctionAmount);
  // //  console.log('DraftController setTeams ', vm.data.setTeams);
  //  console.log('DraftController leage.numTeams ', vm.data.setTeams[5].team.quarterBacks);
  //  console.log('DraftController setUpLeague ', vm.data.setUpLeague);
  // //  console.log('DraftControllerteamSet ', vm.data.teamSet);
  // console.log('DraftController players ', vm.data.players);
  // console.log('DraftController data.setTeams ', vm.data.setTeams);
  // console.log('DraftController data.setTeams.auction ', vm.data.setTeams[3].auctionAmount);
  // vm.array.push(angular.copy(vm.data.team));
}]);
//
// vm.getPPR = function(nflPlayers){
//   SetupService.getPPR(nflPlayers)
//   .then(function(response){
//     console.log('getPPR response ', response );
//   })
// };