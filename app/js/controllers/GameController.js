angular.module('regexpert')
       .controller('GameController',["$sce", function($sce){

  var vm = this;

  vm.isMatch = isMatch;
  vm.highlight = highlight;
  vm.nextLevel = nextLevel;
  vm.currentLevel = {value: 1, expectation: "HPF", text:'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.'};

  function isMatch(input) {
    var matches = vm.currentLevel.text.match(_makeRegexp(input));
    if(matches === null){matches = [];}
    return matches.join('') === vm.currentLevel.expectation;
  }

  function highlight(text, searchString) {
    if (searchString){
      return _convertToHtml(text.replace(_makeRegexp(searchString), function(match){
        return "<span class='highlighted'>" + match + "</span>";
      }));
    }
    return _convertToHtml(text);
  }

  function nextLevel() {
    vm.currentLevel.value = 2;
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }

  function _convertToHtml(text) {
    return $sce.trustAsHtml(text);
  }

}]);
