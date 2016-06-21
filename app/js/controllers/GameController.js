angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService', '$state'];

function GameController(HighlightService, LevelService, GameService, $state){

  var vm = this;

  vm.completeLevel = completeLevel;
  vm.GameService = GameService;
  vm.evaluate = evaluate;
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

  function completeLevel() {
    LevelService.getLevel(vm.level.number + 1)
      .then(setLevel)
      .then(GameService.setScore(vm.level.keystrokelimit));
      // .then(Materialize.toast("+" + vm.level.keystrokelimit + "pts", 2000));
  }

  function setLevel(response) {
    vm.level = response;
  }
}
