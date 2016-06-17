angular.module('regexpert')
       .controller('GameController',['HighlightService', 'LevelService', function(HighlightService, LevelService){

  var vm = this;

  vm.isMatch = isMatch;
  vm.nextLevel = nextLevel;
  vm.incrementScore = incrementScore;
  vm.incrementKeyStrokes = incrementKeyStrokes;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.currentPoints = 0;
  vm.keyStrokeLog = 0;

  function isMatch(input) {
    var matches = vm.currentLevel.text.match(_makeRegexp(input));
    var target = vm.currentLevel.text.match(_makeRegexp(vm.currentLevel.target));
    if(matches === null){matches = [];}
    return matches.join('') === target.join('');
  }

  function nextLevel(currentLevelNumber) {
    LevelService.getLevel(currentLevelNumber + 1).then(function(response) {
      vm.currentLevel = response;
    });
  }

  function incrementScore() {
    return vm.currentPoints += 10;
  }

  function incrementKeyStrokes(input) {
    if(input !== 'Enter'){return vm.keyStrokeLog += 1;}
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }
}]);
