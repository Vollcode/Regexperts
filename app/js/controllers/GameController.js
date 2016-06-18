angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService'];

function GameController(HighlightService, LevelService, GameService){

  var vm = this;

  vm.GameService = GameService;
  vm.nextLevel = nextLevel;
  vm.multiHighlight = HighlightService.multiHighlight;

  activate();

  function activate(){
    LevelService.getLevel(1).then(function(response) {
      vm.currentLevel = response;
    });
  }

  function nextLevel(currentLevelNumber) {
    LevelService.getLevel(currentLevelNumber + 1).then(function(response) {
      vm.currentLevel = response;
    });
  }
}
