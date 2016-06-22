angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService', '$state'];

function GameController(HighlightService, LevelService, GameService, $state){

  var vm = this;

  vm.completeLevel = completeLevel;
  vm.evaluate = evaluate;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.restart = restart;
  vm.k = GameService;

  activate();

  function activate(){
    GameService.setGameState();
    getLevel();
  }

  function restart(){
    GameService.saveGameState(null);
    activate();
  }

  function evaluate() {
    if (vm.level.isLost()) {
      $state.go('gameOver');
    }
  }

  function completeLevel() {
    if(vm.level.number === 10) {
      $state.go('winner');
    } else {
      GameService.saveGameState(GameService.nextLevelState(GameService.currentState, vm.level.keystrokelimit));
      getLevel();
    }
  }

  function getLevel(level) {
    LevelService.getLevel(GameService.state().level).then(function(response){
      vm.level = response;
    });
  }
}
