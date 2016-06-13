angular.module('regexpert')
       .controller('GameController',[ function(){

  var vm = this;

  vm.isMatch = isMatch;
  vm.expectation = "HPF";
  vm.levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';

  function isMatch(input) {
    var matches = vm.levelText.match(_makeRegexp(input));
    if(matches === null){matches = []}
    return matches.join('') === vm.expectation;
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }
  
}]);
