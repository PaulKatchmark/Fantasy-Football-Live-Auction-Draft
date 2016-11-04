// angular.module('auctionApp')
// .controller('SetUpController', ['$location', 'DataService', function($location, DataService){
//
// DataService.getPlayers();
// }]);
//
// function SetUpController(auctionApi) {
//   var self = this;
//   self.players = [];
//
//   console.log('SetUpController loaded');
//   console.log('auctionApi ', auctionApi);
//
//
//
//   /** ---- BOUND FUNCTIONS ---- **/
//
//   self.searchAndDisplayValues = function () {
//     auctionApi.auctionValueInfo(self.keywords)
//       .then(function (response) {
//         console.log('array response', response);
//         self.players = response.data.data;
//       },
//
//     function (response) {
//       console.log('Error retrieving players by keyword');
//     });
//   };
// }
