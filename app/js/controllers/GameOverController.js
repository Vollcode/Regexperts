angular.module('regexpert')
       .controller('GameOverController', GameOverController);

GameOverController.$inject = ['$state'];

function GameOverController($state){

  var vm = this;
  this.restart = restart;

  function restart() {
    $state.go('game');
  }

}
