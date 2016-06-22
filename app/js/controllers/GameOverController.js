angular.module('regexpert')
       .controller('GameOverController', GameOverController);

GameOverController.$inject = ['$state', 'GameService'];

function GameOverController($state, GameService){

  var vm = this;
  this.restart = restart;
  this.getCheckpoint = getCheckpoint;

  function restart(state) {
    GameService.saveGameState(state);
    $state.go('game');
  }

  function getCheckpoint() {
    GameService.loadGameState();
    return GameService.getCheckPoint(GameService.getGameState());
  }


}
