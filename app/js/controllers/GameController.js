angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService'];

function GameController(HighlightService, LevelService, GameService){

  var vm = this;

  vm.GameService = GameService;
  vm.evaluate = evaluate;
  vm.nextLevel = nextLevel;
  vm.multiHighlight = HighlightService.multiHighlight;

  activate();

  function activate(){
    startGame();
  }

  function evaluate() {
    if (vm.level.isLost()) {
      startGame();
    }
  }

  function nextLevel() {
    LevelService.getLevel(vm.level.number + 1).then(function(response) {
      vm.level = response;
    });
  }

  function startGame() {
    LevelService.getLevel(1).then(function(response) {
      vm.level = response;
    });
  }
}
