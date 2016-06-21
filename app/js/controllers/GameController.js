angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService', '$state'];

function GameController(HighlightService, LevelService, GameService, $state){

  var vm = this;

  vm.completeLevel = completeLevel;
  vm.evaluate = evaluate;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.level = GameService.level;

  activate();

  function activate(){
    GameService.getGameState();
    GameService.setLevel();
  }

  function evaluate() {
    if (GameService.level.isLost()) {
      $state.go('gameOver');
    }
  }

  function completeLevel() {
    if(GameService.level.number === 10) {
      $state.go('winner');
    } else {
      GameService.updateScore(GameService.level.keystrokelimit);
      GameService.nextLevel();
    }
  }
}
