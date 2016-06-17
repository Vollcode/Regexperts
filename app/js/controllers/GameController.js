angular.module('regexpert')
       .controller('GameController',['HighlightService', 'LevelService', 'GameService', function(HighlightService, LevelService, GameService){

  var vm = this;

  vm.nextLevel = nextLevel;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.GameService = GameService;

  function nextLevel(currentLevelNumber) {
    LevelService.getLevel(currentLevelNumber + 1).then(function(response) {
      vm.currentLevel = response;
    });
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }
}]);
