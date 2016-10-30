angular.module('auctionApp')
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            // controller: 'HomeController as homeCtrl',
          }).when('/home', {
            templateUrl: 'views/home.html',
            // controller: 'HomeController as homeCtrl',
          }).when('/settings', {
            templateUrl: 'views/settings.html',
            // controller: 'SettingsController as settCtrl',
          }).when('/teams' , {
            templateUrl: 'views/teams.html',
            // contoller: 'TeamsController as teamCtrl'
          });
  $locationProvider.html5Mode(true);
});
