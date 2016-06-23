angular.module('regexpert')
       .controller('HighScoreController', HighScoreController);

HighScoreController.$inject = ['GameService', 'HighScoreService'];

function HighScoreController(GameService, HighScoreService) {

  var vm = this;

  vm.getScores = getScores;
  vm.add = add;
  vm.currentScore = currentScore;
  vm.canAdd = true;

  getScores();

  function getScores() {
    return HighScoreService.getHighScores().then(function(response) {
      vm.scores = response;
    });
  }

  function add(score, user) {
    if(vm.canAdd){
      return HighScoreService.postHighScores({user: user, score: score})
      .then(getScores)
      .then(vm.canAdd = false);
    }
  }

  function currentScore() {
    GameService.loadGameState();
    return GameService.getGameState().score;
  }
}
