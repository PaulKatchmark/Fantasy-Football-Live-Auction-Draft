angular.module('auctionApp')
 .controller('DraftController', ['SetupService', function (SetupService) {
  //  console.log('DraftController loaded');
   var vm = this;
   vm.firstname;
   vm.data = SetupService.data;
   vm.playerSelected = false;
   vm.selectedP;
   vm.selectedPlayer;
   vm.elementPos;
   vm.array;


   vm.firstname = SetupService.data.firstname;

  vm.logout = function() {
    SetupService.logout();
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
    vm.array = [];
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
    console.log('selected team ', vm.data.teamArray);
    console.log('selected player ', vm.data.draftedPlayer);
    // console.log('amount paid ', vm.data.amountPaid);
    if(vm.data.teamArray.auctionAmount >= vm.data.amountPaid) {
      SetupService.playerToTeam();
      vm.data.amountPaid = "";
      vm.selectedP = "";
      vm.data.teamArray = "";
      vm.playerSelected = false;
      vm.array.splice(vm.elementPos, 1);
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
