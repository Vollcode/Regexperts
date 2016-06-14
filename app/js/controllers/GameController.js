angular.module('regexpert')
       .controller('GameController',['HighlightService', function(HighlightService){

  var vm = this;

  vm.isMatch = isMatch;
  vm.multiHighlight = HighlightService.multiHighlight;
  vm.currentLevel = {value: 1, expectation: "\\b[a-z]..\\b", text:'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.'};

  function isMatch(input) {
    var matches = vm.currentLevel.text.match(_makeRegexp(input));
    var target = vm.currentLevel.text.match(_makeRegexp(vm.currentLevel.expectation));
    if(matches === null){matches = [];}
    return matches.join('') === target.join('');
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }
}]);
