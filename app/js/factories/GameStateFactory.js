angular.module('regexpert')
      .factory('GameStateFactory', GameStateFactory);

function GameStateFactory(){
  var GameState = function(gameProperties){
    this.level = gameProperties.level;
    this.score = gameProperties.score;
    this.checkpoint = gameProperties.checkpoint;
    this.checkpointScore = gameProperties.checkpointScore;
    this.hintDisplayed = gameProperties.hintDisplayed;
  };

  GameState.prototype.updateScore = function (points) {
    this.score += points;
  };

  GameState.prototype.increaseLevel = function (level) {
    this.level ++;
    this.hintDisplayed = false;
  };

  GameState.prototype.updateCheckpoint = function () {
    if(this.level % 3 === 0){
      this.checkpoint = this.level;
      this.checkpointScore = this.score;
    }
  };

  GameState.prototype.displayHint = function () {
    if (this.hintDisplayed === false) {
      this.score -= 10;
      this.hintDisplayed = true;
    }
  };

  return GameState;
}
