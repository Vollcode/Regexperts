angular.module('regexpert')
       .controller('GameOverController', GameOverController);

GameOverController.$inject = ['$state', 'GameService'];

function GameOverController($state, GameService){

  var vm = this;
  this.restart = restart;

  function restart(state) {
    GameService.saveGameState(state);
    $state.go('game');
  }

}
