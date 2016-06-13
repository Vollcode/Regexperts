angular.module('regexpert')
       .controller('GameController',[ function(){

  var vm = this;

  vm.isWon = isWon;
  vm.expectation = "HPF";
  vm.levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';

  function isWon(input) {
    var regexp = new RegExp(input, 'g');
    var matchedValue = vm.levelText.match(regexp);
    var matchFound = matchedValue === null ? [] : matchedValue;
    return matchFound.join('') === vm.expectation;
  }


}]);
