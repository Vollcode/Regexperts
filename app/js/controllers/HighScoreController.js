angular.module('regexpert')
       .controller('HighScoreController', HighScoreController);

HighScoreController.$inject = ['GameService', 'HighScoreService'];

function HighScoreController(GameService, HighScoreService) {

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
    return HighScoreService.postHighScores({user: user, score: score});
  }

  function currentScore() {
    GameService.loadGameState();
    return GameService.getGameState().score;
  }
}
