angular.module('regexpert')
       .controller('GameController',GameController);

GameController.$inject = ['HighlightService', 'LevelService', 'GameService'];

function GameController(HighlightService, LevelService, GameService){

  var vm = this;

  vm.nextLevel = nextLevel;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.GameService = GameService;

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
