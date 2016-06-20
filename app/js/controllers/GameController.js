angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService', '$state'];

function GameController(HighlightService, LevelService, GameService, $state){

  var vm = this;

  vm.GameService = GameService;
  vm.evaluate = evaluate;
  vm.nextLevel = nextLevel;
  vm.multiHighlight = HighlightService.multiHighlight;

  activate();

  function activate(){
    LevelService.getLevel(1).then(setLevel);
  }

  function evaluate() {
    if (vm.level.isLost()) {
      $state.go('gameOver');
    }
  }

  function nextLevel() {
    LevelService.getLevel(vm.level.number + 1).then(setLevel);
  }

  function setLevel(response) {
    vm.level = response;
  }

}
