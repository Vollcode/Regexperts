angular.module('regexpert').service('GameService', function(){

  this.score = 0;
  this.getScore = getScore;
  this.updateScore = updateScore;


  function getScore() {
    return this.score;
  }

  function updateScore(amount){
    this.score += amount;
  }

});
