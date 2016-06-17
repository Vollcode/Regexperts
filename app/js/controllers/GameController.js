angular.module('regexpert')
       .controller('GameController',['HighlightService', 'LevelService', 'GameService', function(HighlightService, LevelService, GameService){

  var vm = this;

  vm.nextLevel = nextLevel;
  vm.incrementKeyStrokes = incrementKeyStrokes;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.GameService = GameService;
  vm.keyStrokeLog = 0;

  function nextLevel(currentLevelNumber) {
    LevelService.getLevel(currentLevelNumber + 1).then(function(response) {
      vm.currentLevel = response;
      vm.keyStrokeLog = 0;
    });
  }

  function incrementKeyStrokes(input) {
    if(input !== 'Enter'){vm.keyStrokeLog += 1;}
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }
}]);
