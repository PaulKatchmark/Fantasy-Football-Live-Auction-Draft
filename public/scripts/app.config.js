angular.module('auctionApp')
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register'
  }).when('/home', {
    templateUrl: 'views/home.html',
    controller: 'DraftController as draft',
  }).when('/settings', {
    templateUrl: 'views/settings.html',
    controller: 'SettingsController as settings',
  }).when('/teams' , {
    templateUrl: 'views/teams.html',
    controller: 'LeagueController as league',
  }).otherwise({
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  });
  $locationProvider.html5Mode(true);
});
