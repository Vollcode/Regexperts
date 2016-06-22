angular.module('regexpert')
      .factory('GameStateFactory', GameStateFactory);

GameStateFactory.$inject = [];

function GameStateFactory(){
  var GameState = function(gameProperties){
    this.level = gameProperties.level;
    this.score = gameProperties.score;
    this.checkpoint = gameProperties.checkpoint;
    this.checkpointScore = gameProperties.checkpointScore;
  };

  GameState.prototype.updateScore = function (points) {
    this.score += points;
  };

  GameState.prototype.increaseLevel = function (level) {
    this.level ++;
  };

  GameState.prototype.updateCheckpoint = function () {
    if(this.level % 3 === 0){
      this.checkpoint = this.level;
      this.checkpointScore = this.score;
    }
  };

  return GameState;
}
