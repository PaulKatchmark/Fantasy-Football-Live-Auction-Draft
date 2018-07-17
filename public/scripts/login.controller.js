angular.module('auctionApp')
.controller('LoginController', LoginController);

function LoginController($http, $location, SetupService, localStorageService) {
  // console.log('LoginController loaded');
  var ctrl = this;
  // var navBarLogin = function() {
  //   ctrl.signedInAs = false;
  //   ctrl.signOut = false;
  //   ctrl.leagueTab = false;
  //   ctrl.draftTab = false;
  //   ctrl.settingsTab = false;
  // }
  ctrl.username = SetupService.getItem('username');
  ctrl.firstname = SetupService.getItem('firstname');
  ctrl.loginError = false;

  if(localStorageService.isSupported) {
    console.log('ready to rock and roll')
  }

  // navBarLogin();
  ctrl.login = function() {
    ctrl.loginError = false;
    SetupService.data.username = ctrl.username;
    SetupService.data.firstname = ctrl.firstname;
    SetupService.getUserFirstName();
    SetupService.submit('firstname', SetupService.data.firstname)
    SetupService.submit('username', SetupService.data.username)
    console.log('logging in as ', ctrl.username);
    $http.post('/login', {
      username: ctrl.username,
      password: ctrl.password
    }).then(function(){
      $location.path('/settings');
    }, function(error) {
      ctrl.loginError = true;
      console.log('ctrl.loginError = ', ctrl.loginError)
      console.log('error loggin in', error);
    });
  };
}
