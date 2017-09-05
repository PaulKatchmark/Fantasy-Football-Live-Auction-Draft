angular.module('auctionApp')
.controller('LeagueController', ['SetupService','localStorageService', function (SetupService, localStorageService) {
  console.log('LeagueController loaded');
  var vm = this;
  vm.data = SetupService.data;
  vm.newValue;
  vm.firstname;
  vm.firstname = SetupService.data.firstname;

  SetupService.data.totalTeams = SetupService.getItem('totalTeams');

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
    // SetupService.submit('currentTeam', SetupService.data.totalTeams)
  }

  vm.doneEditing = function(item) {
    //send new amount back and change editing back to false
    //team.paid will be the value edited.
    SetupService.doneEditing(item);
    vm.newValue = '';
    // SetupService.submit('players', vm.data.players)
    // SetupService.submit('currentTeam', SetupService.data.totalTeams)
  }

  vm.undraftPlayer = function (team, item) {
    SetupService.undraftPlayer(team, item);
    SetupService.submit('players', vm.data.players)
    SetupService.submit('currentTeam', SetupService.data.totalTeams)
  }

  vm.movePlayer = function(team, item) {
    SetupService.data.draftedPlayer = item;
    console.log('inside undraft function: team is', team);
    console.log('inside undraft function: item is', item);
    item.transfer = true;
    // SetupService.movePlayer(team, item);
  }

//*************************************************************
// Fix overflow on draft table as well


  //fix table expansion and them moving when row stretches
  //edit money to be red when above proj value and green when below
//*************************************************************
  vm.teamTransfer = function(currentTeam, newTeam, item) {
    //find a way to not offer team you are on as an option in dropdown
    if(currentTeam != newTeam) {
      if(newTeam.auctionAmount >= item.paid) {
        if (confirm("Transfer " + item.displayname + " to " + newTeam.name + "?")) {
          item.transfer = false;
          currentTeam.auctionAmount += item.paid;
          vm.data.amountPaid = item.paid;
          SetupService.playerToTeam();
          SetupService.submit('players', vm.data.players)
          vm.data.teamArray="";
          for (i=0; i<currentTeam.team.length; i++) {
            if (currentTeam.team[i].qb) {
              if (currentTeam.team[i].qb.displayname === item.displayname) {
                currentTeam.team[i].qb = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'QB',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].rb) {
              if (currentTeam.team[i].rb.displayname === item.displayname) {
                currentTeam.team[i].rb = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'RB',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].wr) {
              if (currentTeam.team[i].wr.displayname === item.displayname) {
                currentTeam.team[i].wr = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'WR',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].te) {
              if (currentTeam.team[i].te.displayname === item.displayname) {
                currentTeam.team[i].te = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'TE',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].fp) {
              if (currentTeam.team[i].fp.displayname === item.displayname) {
                currentTeam.team[i].fp = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'FLEX',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].k) {
              if (currentTeam.team[i].k.displayname === item.displayname) {
                currentTeam.team[i].k = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'K',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].def) {
              if (currentTeam.team[i].def.displayname === item.displayname) {
                currentTeam.team[i].def = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'DEF',
                  team: '',
                  paid: 0
                };
              }
            }
            if (currentTeam.team[i].bs) {
              if (currentTeam.team[i].bs.displayname === item.displayname) {
                currentTeam.team[i].bs = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'BENCH',
                  team: '',
                  paid: 0
                };
              }
            }
          }
          SetupService.submit('currentTeam', SetupService.data.totalTeams)
          SetupService.submit('totalTeams', SetupService.data.totalTeams)
          SetupService.getItem('currentTeam')
        } else {
          //do nothing
        }
      } else {
        alert("Sorry, " + newTeam.name + " doesn't have enough money.")
      }
    } else {
      alert("Sorry, " + item.displayname + " is already on " + currentTeam.name + ".")
    }
  }

  navBarTeams();
  console.log('signedInAs ', vm.signedInAs);
}]);
