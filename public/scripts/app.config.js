angular.module('auctionApp')
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController as register'
          }).when('/home', {
            templateUrl: 'views/home.html',
            // controller: 'HomeController as homeCtrl',
          }).when('/settings', {
            templateUrl: 'views/settings.html',
            // controller: 'SettingsController as settCtrl',
          }).when('/teams' , {
            templateUrl: 'views/teams.html',
            // contoller: 'TeamsController as teamCtrl'
          }).otherwise({
            templateUrl: 'views/login.html',
            controller: 'LoginController as login'
          });

  $locationProvider.html5Mode(true);
});
