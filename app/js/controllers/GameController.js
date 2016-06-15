angular.module('regexpert')
       .controller('GameController',['HighlightService', 'LevelService','LevelFactory', function(HighlightService, LevelService, LevelFactory){

  var vm = this;

  vm.isMatch = isMatch;
  vm.nextLevel = nextLevel;
  vm.multiHighlight = HighlightService.multiHighlight;

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

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }
}]);
