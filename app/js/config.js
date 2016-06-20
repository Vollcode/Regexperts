angular.module('regexpert')
       .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('game', {
      url: "/",
      templateUrl: "partials/game.html"
    })
    .state('gameOver', {
      url: "/gameOver",
      templateUrl: "partials/gameOver.html"
    });
}
