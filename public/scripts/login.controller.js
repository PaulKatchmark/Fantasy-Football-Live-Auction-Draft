angular.module('auctionApp')
.controller('LoginController', LoginController);

function LoginController($http, $location, SetupService) {
  // console.log('LoginController loaded');
  var ctrl = this;
  var navBarLogin = function() {
    ctrl.signedInAs = false;
    ctrl.signOut = false;
    ctrl.leagueTab = false;
    ctrl.draftTab = false;
    ctrl.settingsTab = false;
  }
  navBarLogin();
  ctrl.login = function() {
    SetupService.data.username = ctrl.username;
    SetupService.getUserFirstName();
    console.log('logging in as ', ctrl.username);
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(){
      $location.path('/settings');
    }, function(error) {
      console.log('error loggin in', error);
    });
  };
}
