angular.module('regexpert')
       .config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider'];

function config($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('game', {
      url: "/",
      templateUrl: "partials/_game.html",
    })
    .state('gameOver', {
      url: "/gameOver",
      templateUrl: "partials/_gameOver.html",
    })
    .state('winner', {
      url: "/winner",
      templateUrl: "partials/_winner.html",
    })
    .state('demo', {
      url: "/demo",
      templateUrl: "partials/_demo.html",
    });
}
