angular.module('regexpert')
      .factory('GameStateFactory', GameStateFactory);

GameStateFactory.$inject = [];

function GameStateFactory(){
  var GameState = function(stateObj){
    this.level = stateObj.level;
    this.score = stateObj.score;
    this.checkpoint = stateObj.checkpoint;
    this.checkpointScore = stateObj.checkpointScore;
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
