angular.module('auctionApp')
.controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
  // console.log('RegisterController loaded');
  var ctrl = this;
  var navBarRegister= function() {
    ctrl.signedInAs = false;
    ctrl.signOut = false;
    ctrl.leagueTab = false;
    ctrl.draftTab = false;
    ctrl.settingsTab = false;
  }

  navBarRegister();
  console.log('signedInAs ', ctrl.signedInAs);
  ctrl.register = function() {
  console.log('registering new user');
    $http.post('/register', {
      firstName: ctrl.firstName,
      lastName: ctrl.lastName,
      username: ctrl.username,
      password: ctrl.password
    }).then(function(){
      $location.path('/login');
    }, function(error) {
      console.log('error registering', error);
    });
  };
}
