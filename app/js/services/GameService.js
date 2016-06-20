angular.module('regexpert').service('GameService', GameService);

function GameService(){

  var self = this;

  this.score = 0;
  this.getScore = getScore;
  this.updateScore = updateScore;

  // function getScore() {
  //   return this.score;
  // }

  function updateScore(amount) {
    this.score += amount;
    self.set(this.score);
  }

  self.set = function(score) {
    localStorage.setItem('curentScore', JSON.stringify(score));
  };

  function getScore() {
    return JSON.parse(localStorage.getItem('curentScore'));
  };

  // self.getScore = function() {
  //   return JSON.parse(localStorage.getItem('curentScore'));
  // };

}
