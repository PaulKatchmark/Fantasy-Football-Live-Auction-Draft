angular.module('auctionApp')
.service('SetupService',['$http', '$location', 'localStorageService', function($http, $location, localStorageService){
  var data = {};
  var vm = this;
  var teamCol;
  var valueDiff;
  var teamToEdit;
  data.setUpLeague = getItem('setUpLeague');
  data.username = getItem('username');
  data.firstname = getItem('firstname');
  data.league = getItem('league');
  data.team = getItem('team');
  data.customTeamNames = getItem('customTeamNames');
  data.auctionAmount = getItem('auctionAmount');
  data.teamId = [];
  data.currentTeams = getItem('currentTeams')
  // var createTeams;
  data.draftedPlayer;
  // data.setTeams = [];
  data.totalTeams = [];
  // data.teamSet = true;
  data.ableToDraft = false;
  vm.draftTeam;
  data.amountPaid;
  data.players = getItem('players');
  data.leagueTeams;
  data.numberArray = [0,1,2,3,4,5,6,7,8];
  data.teamArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
  //add search and sort options to full player list
  data.sortType = teamCol;
  data.sortReverse = true;
  data.searchPlayer = '';
  data.editedPlayer = [];
  data.wrongChoiceTip = true;
  data.wrongValueTip = true;
  data.showLeagueTips = false;
  data.tabTip = true;
  data.searchTip = true;
  data.draftTip = true;
  data.showDraftTips = false;
  // SetupService.getItem(SetupService.data.username);

  function submit(key, val) {
    console.log('setting local storage k/v ', key, val)
    return localStorageService.set(key, val);
  }

  function getItem(key) {
    console.log('getting local storage key ', key)
    return localStorageService.get(key);
  }

  function removeItem(key) {
   return localStorageService.remove(key);
  }

  function removeItems(key1, key2, key3) {
   return localStorageService.remove(key1, key2, key3);
  }

  function clearAll() {
   return localStorageService.clearAll();
  }

  // if (data.setUpLeague === 0 || data.setUpLeague ===1 ) {
  //   setTeamInfo();
  // }
  console.log('HERE HERE HERE is currentTeams ', data.currentTeams)
  // if(data.currentTeams) {
  //   data.currentTeams = getItem('currentTeams');
  //   data.players = getItem('players')
  //   console.log('here is the new value of currentTeams ', data.totalTeams)
  // } 
    

  //THIS IS WHERE WE WILL ADD ARAY OF TEAM NAMES

  //create a team for each person in league
  function allTeams (){
    if(data.leagueTeams>0){
      for (var i=0; i<data.leagueTeams; i++){
        var createTeams = {};
        createTeams.teamId = i;
        createTeams.name = data.customTeamNames[i];
        createTeams.auctionAmount = data.league.auctionAmount;
        console.log('inside service.js ', data.league.auctionAmount);
        createTeams.team = clone(data.team);
        // console.log('createTeams ', createTeams);
        data.totalTeams.push(createTeams);
        // console.log('allTeams function ', data.setTeams[0].auctionAmount);
      }
      submit('currentTeams', data.totalTeams)
      submit('totalTeams', data.totalTeams)
      data.currentTeams = data.totalTeams;
      // vm.teamSet=false;
      // data.totalTeams = data.setTeams;
      console.log('data.totalTeams ', data.totalTeams);
    }
  }

  function returnInt (element) {
    return parseInt(element, 10);
  }

    //function to get full players list from DB with values for PPR League
  function getPPR(){
    teamCol = 'teams_' + data.league.numTeams;
    $http.get('/ppr/'+teamCol).then(function(response) {
      data.sortType = teamCol;
      data.sortReverse = true;

      for (i = 0; i < response.data.length; i++) {
        if (data.league.auctionAmount === 100) {
          response.data[i][teamCol] *= .5;
        } if (data.league.auctionAmount === 120) {
          response.data[i][teamCol] *= .6;
        } if (data.league.auctionAmount === 150) {
          response.data[i][teamCol] *= .75;
        } if (data.league.auctionAmount === 250) {
          response.data[i][teamCol] *= 1.25;
        } if (data.league.auctionAmount === 300) {
          response.data[i][teamCol] *= 1.50;
        } if (data.league.auctionAmount === 350) {
          response.data[i][teamCol] *= 1.75;
        }   if (data.league.auctionAmount === 400) {
          response.data[i][teamCol] *= 2.00;
        }
      }
      console.log(data.players);
      submit('players', response.data);
      return data.players = response.data;
    });
  }

  function getStandard() {
    teamCol = 'teams_' + data.league.numTeams;
    $http.get('/standard/'+teamCol).then(function(response) {
      data.sortType = teamCol;
      data.sortReverse = true;
      for (i = 0; i < response.data.length; i++) {
        if (data.league.auctionAmount === 100) {
          response.data[i][teamCol] *= .5;
        } if (data.league.auctionAmount === 120) {
          response.data[i][teamCol] *= .6;
        } if (data.league.auctionAmount === 150) {
          response.data[i][teamCol] *= .75;
        } if (data.league.auctionAmount === 250) {
          response.data[i][teamCol] *= 1.25;
        } if (data.league.auctionAmount === 300) {
          response.data[i][teamCol] *= 1.50;
        } if (data.league.auctionAmount === 350) {
          response.data[i][teamCol] *= 1.75;
        }   if (data.league.auctionAmount === 400) {
          response.data[i][teamCol] *= 2.00;
        }
      }
      submit('players', response.data);
      return data.players = response.data;
    });
  }

  // function positionColor(position) {
  //   if (position == "QB") {
  //     return "qbClass"
  //   } else if ( position == "WR") {
  //     return "wrClass"
  //   } else if ( position == "RB") {
  //     return "rbClass"
  //   } else if ( position == "TE") {
  //     return "teClass"
  //   } else if ( position == "K") {
  //     return "kClass"
  //   } else {
  //     return "defClass"
  //   }
  // }


  function getUserFirstName() {
    var username = data.username;
    $http.get('/login/'+username).then(function(response) {
      data.firstname = response.data[0].firstname;
      data.firstname = data.firstname.charAt(0).toUpperCase() + data.firstname.substr(1);
      console.log('firstname ', data.firstname);
    });
  }

  function editDollars(team, item) {
    console.log('team edited ', team)
    console.log('data.totalTeams ', data.totalTeams)
    for (i = 0; i < data.totalTeams.length; i++){
      if (data.totalTeams[i].name === team) {
        console.log('this is the team name inside if statement ', data.totalTeams[i].name)
      }
    }
    //console.log('editDollars in Service ', item);
    data.editedPlayer.editing = false;
    data.editedPlayer = '';
    data.editedPlayer = item;
    teamToEdit = '';
    teamToEdit = team;
    data.currentTeams = data.totalTeams;
    submit('currentTeams', data.currentTeams)
    submit('totalTeams', data.totalTeams)
    submit('players', data.players)
    console.log('edited player ', data.editedPlayer)
  }
  function doneEditing(item) {
    console.log('doneEditing in Service ', item);
    console.log('inside doneEditing edited player ', data.editedPlayer)
    valueDiff = data.editedPlayer.paid - item;
    console.log('valueDiff ', valueDiff)
    if (item > 0) {
      for (i = 0; i < data.totalTeams.length; i++){
        if (data.totalTeams[i].name === teamToEdit) {
          console.log('this is the team name inside if statement ', data.totalTeams[i].name)
          //data.teamArray.auctionAmount += valueDiff;
          data.editedPlayer.paid = item;
          data.totalTeams[i].auctionAmount += valueDiff;
        }
      }
    }  
    data.editedPlayer.editing = false;
    console.log('EDITED PLAYER ', data.editedPlayer)
    submit('currentTeams', data.totalTeams)
    submit('totalTeams', data.totalTeams)
    submit('players', data.players)
    //item = ;
  }

  //undraft or potentially move player to another team
  // function movePlayer(team, item) {
  //     console.log('team edited ', team)
  //     console.log('data.totalTeams ', data.totalTeams)
  //     for (i = 0; i < data.totalTeams.length; i++){
  //       if (data.totalTeams[i].name === team) {
  //         console.log('this is the team name inside if statement ', data.totalTeams[i].name)
  //       }
  //     }
  //     data.editedPlayer.transfer = false;
  // }



//**********************************************************

//this function can be simplified, check "team" parameter and compare to
// league.controller.js line 46

//need to reset the drafted amount. it repears in auction showing last value
//**********************************************************
  function undraftPlayer(team, item) {
    console.log('player to undraft ', item.displayname)
    for (i = 0; i < data.totalTeams.length; i++){
        if (data.totalTeams[i].name === team) {
          console.log('this is the team name inside if statement ', data.totalTeams[i].team)
          for(index=0; index<data.totalTeams[i].team.length; index++) {
            if (data.totalTeams[i].team[index].qb) {
              if (data.totalTeams[i].team[index].qb.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].qb = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'QB',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].rb) {
              if (data.totalTeams[i].team[index].rb.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].rb = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'RB',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].wr) {
              if (data.totalTeams[i].team[index].wr.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].wr = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'WR',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].te) {
              if (data.totalTeams[i].team[index].te.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].te = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'TE',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].fp) {
              if (data.totalTeams[i].team[index].fp.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].fp = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'FLEX',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].k) {
              if (data.totalTeams[i].team[index].k.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].k = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'K',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].def) {
              if (data.totalTeams[i].team[index].def.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].def = {
                  id: 0,
                  byeweek: '',
                  displayname: '',
                  pos: 'DEF',
                  team: '',
                  paid: 0
                };
              }
            }
            if (data.totalTeams[i].team[index].bs) {
              if (data.totalTeams[i].team[index].bs.displayname === item.displayname) {
                item.transfer = false;
                data.totalTeams[i].auctionAmount += item.paid;
                data.players.push(item);
                submit('players', data.players)
                data.totalTeams[i].team[index].bs = {
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
          data.currentTeams = data.totalTeams
          submit('currentTeams', data.totalTeams)
          submit('totalTeams', data.totalTeams)
        }
      }
  }

  function logout() {
    clearAll();
    $http.get('/logout').then(function(){
      data.firstname = "";
      $location.path('/');
      window.location.reload(true);
    }, function(error) {
      console.log('error logging out', error);
    });
  };

  //function used to locate player index in the master list of players, takes a player and uses their id
  function locatePlayer(player){
    var id= player.id;
    console.log('player ', player);
    data.draftedPlayer = player;
    console.log('displayname id ', id);
    // return player;
  }

  function playerToTeam() {
    console.log('data.players ', data.players);
    var x = data.teamArray.teamId;
    data.chosenTeam = {};
    data.chosenTeam.team = [];
    data.chosenTeam.team = data.totalTeams[x].team;
    data.cost = 0;
    data.cost = data.amountPaid;
    console.log('service selected team ', data.teamArray);
    console.log('service selected player ', data.draftedPlayer);
    console.log('service amount paid ', data.amountPaid);

    // console.log('find out array length ', data.teamArray.team.length);
    if (data.teamArray.team.length > 0) {
      data.chosenTeam.team.some(function(item) {
        // console.log('item ', item);
        if (data.draftedPlayer.pos === "QB") {
          if (item.qb !== undefined && item.qb.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.qb = data.draftedPlayer;
            item.qb.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            console.log('item.qb ', item.qb)
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.qb;
          }
        }
        if (data.draftedPlayer.pos === "RB") {
          if (item.rb !== undefined && item.rb.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.rb = data.draftedPlayer;
            item.rb.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.rb;
          }
        }
        if (data.draftedPlayer.pos === "WR") {
          if (item.wr !== undefined && item.wr.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.wr = data.draftedPlayer;
            item.wr.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.wr;
          }
        }
        if (data.draftedPlayer.pos === "TE") {
          if (item.te !== undefined && item.te.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.te = data.draftedPlayer;
            item.te.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.te;
          }
        }
        if (data.draftedPlayer.pos === "RB" || data.draftedPlayer.pos === "WR" || data.draftedPlayer.pos === "TE") {
            console.log('********* ', data.draftedPlayer.pos)
            console.log('********* ', data.draftedPlayer)
          if (item.fp !== undefined && item.fp.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.fp = data.draftedPlayer;
            item.fp.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.fp;
          }
        }
        if (data.draftedPlayer.pos === "K") {
          if (item.k !== undefined && item.k.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.k = data.draftedPlayer;
            item.k.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.k;
          }
        }
        if (data.draftedPlayer.pos === "DEF") {
          if (item.def !== undefined && item.def.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.def = data.draftedPlayer;
            item.def.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.def;
          }
        }
        if (data.draftedPlayer.pos === "QB" || data.draftedPlayer.pos === "RB" || data.draftedPlayer.pos === "WR" || data.draftedPlayer.pos === "TE" || data.draftedPlayer.pos === "K" || data.draftedPlayer.pos === "DEF") {
          if (item.bs !== undefined && item.bs.id === 0) {
            // console.log('data.teamArray ', data.chosenTeam.team);
            data.ableToDraft = true;
            item.bs = data.draftedPlayer;
            item.bs.paid = parseInt(data.amountPaid);
            data.teamArray.auctionAmount -= data.amountPaid;
            console.log('chosenTeam ', data.chosenTeam.team);
            data.currentTeams = data.totalTeams
            submit('currentTeams', data.totalTeams)
            submit('totalTeams', data.totalTeams)
            return item.bs;
          } else {
            return data.ableToDraft = false;
          }
        } else {
          return data.ableToDraft = false;
        }
      });
      console.log('all the teams ', data.totalTeams);
    }
  };

  function translatePostions(){
    if (data.team[0].quarterBacks > 0) {
      var qb = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'QB',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].quarterBacks; i++ ) {
        data.team.push({'qb':qb});
      }
    };
    if (data.team[0].runningBacks > 0) {
      var rb = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'RB',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].runningBacks; i++ ) {
        data.team.push({'rb':rb});
      }
    };
    if (data.team[0].wideReceivers > 0) {
      var wr = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'WR',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].wideReceivers; i++ ) {
        data.team.push({'wr':wr});
      }
    };
    if (data.team[0].tightEnds > 0) {
      var te = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'TE',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].tightEnds; i++ ) {
        data.team.push({'te':te});
      }
    };
    if (data.team[0].flexSpot > 0) {
      var fp = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'Flex',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].flexSpot; i++ ) {
        data.team.push({'fp':fp});
      }
    };
    if (data.team[0].kicker > 0) {
      var k = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'K',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].kicker; i++ ) {
        data.team.push({'k':k});
      }
    };
    if (data.team[0].defense > 0) {
      var def = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'DEF',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].defense; i++ ) {
        data.team.push({'def':def});
      }
    };
    if (data.team[0].benchSpots > 0) {
      var bs = {
        id: 0,
        byeweek: '',
        displayname: '',
        pos: 'Bench',
        team: '',
        paid: 0
      };
      for (i=1; i <= data.team[0].benchSpots; i++ ) {
        data.team.push({'bs':bs});
      }
    };
    data.team.shift(); //THIS NEEDS TO BE THERE BUT DUE TO SETTINGS HTML CHANGES, Need to look at why objects aren't being created.
  }

  function setTeamInfo() {
    console.log('setUpLeague ', data.setUpLeague);
    console.log('Number of teams in league ', data.league.numTeams);
    if (data.setUpLeague === 1) {
      getPPR();
    } else if (data.setUpLeague === 0) {
      getStandard();
    } else {
      console.log('error getting players from DB');
    }
    data.leagueTeams = data.league.numTeams;
    translatePostions();
    allTeams();
  };

  function clone(obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
      }
       return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  function tipOff(tip) {
    console.log('heres our tip: ', tip);
    if (tip === 'wrongChoiceTip') {
      data.wrongChoiceTip = false;
      data.showLeagueTips = true;
    }
    if (tip === 'wrongValueTip') {
      data.wrongValueTip = false;
      data.showLeagueTips = true;
    }
    if (tip === 'tabTip') {
      data.tabTip = false;
      data.showDraftTips = true;
    }
    if (tip === 'searchTip') {
      data.searchTip = false;
      data.showDraftTips = true;
    }
    if (tip === 'draftTip') {
      data.draftTip = false;
      data.showDraftTips = true;
    }
  }

  function tipsOn(page) {
    if (page === 'league') {
      data.wrongChoiceTip = true;
      data.wrongValueTip = true;
      data.showLeagueTips = false;
    }
    if (page === 'draft'){
      data.tabTip = true;
      data.searchTip = true;
      data.draftTip = true;
      data.showDraftTips = false;
    }
  }

  return {
    data: data,
    setTeamInfo: setTeamInfo,
    getPPR: getPPR,
    locatePlayer: locatePlayer,
    playerToTeam: playerToTeam,
    getStandard: getStandard,
    getUserFirstName: getUserFirstName,
    logout: logout,
    editDollars: editDollars,
    doneEditing: doneEditing,
    // movePlayer: movePlayer,
    undraftPlayer: undraftPlayer,
    getItem: getItem,
    submit: submit,
    removeItem: removeItem,
    removeItems: removeItems,
    clearAll: clearAll,
    tipsOn: tipsOn,
    tipOff: tipOff
    //positionColor: positionColor
  }

}]);
