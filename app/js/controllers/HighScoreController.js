angular.module('regexpert')
       .controller('HighScoreController', HighScoreController);

HighScoreController.$inject = ['GameService'];

function HighScoreController(GameService) {

  var vm = this;

  vm.scores = [];
  vm.show = show;
  vm.add = add;
  vm.currentScore = currentScore;

  function show() {
    return vm.scores.sort(function(a, b){
      return a.score < b.score;
    });
  }

  function add(score, user) {
    var highScore = {score: score, time: new Date(), user: user};
    vm.scores.push(highScore);
  }

  function currentScore() {
    GameService.loadGameState()
    return GameService.getGameState().score;
  }
}
