angular.module('auctionApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
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
  console.log('signedInAs ', ctrl.signedInAs);



  // SetUpService.navBarLogin();
  ctrl.login = function() {
    // console.log('logging in');
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
