angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService', '$state'];

function GameController(HighlightService, LevelService, GameService, $state){

  var vm = this;

  vm.completeLevel = completeLevel;
  vm.evaluate = evaluate;
  vm.multiHighlight = HighlightService.multiHighlight;

  activate();

  function activate(){
    var storedLevel = localStorage.getItem('currentLevel');
    var startLevel = storedLevel === null ? 1 : storedLevel;
    LevelService.getLevel(startLevel).then(setLevel);
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
      LevelService.getLevel(vm.level.number + 1)
      .then(setLevel)
      .then(setScore);
    }
  }

  function setLevel(response) {
    vm.level = response;
    LevelService.storeLevelNumber(vm.level.number);
  }

  function setScore() {
    GameService.setScore(vm.level.keystrokelimit);
  }
}
