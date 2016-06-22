angular.module('regexpert')
       .controller('HighScoreController', HighScoreController);

HighScoreController.$inject = [];

function HighScoreController() {

  var vm = this;

  vm.scores = [];
  vm.show = show;
  vm.add = add;

  function show() {
    return vm.scores.sort(function(a, b){
      return a.score < b.score;
    });
  }

  function add(score, user) {
    var highScore = {score: score, time: new Date(), user: user};
    vm.scores.push(highScore);
  }
}
