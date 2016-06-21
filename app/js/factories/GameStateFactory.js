angular.module('regexpert')
      .factory('GameStateFactory', GameStateFactory);

GameStateFactory.$inject = [];

function GameStateFactory(){
  var GameState = function(obj){
    this.level = obj.level;
    this.score = obj.score;
    this.checkpoint = obj.checkpoint;
    this.checkpointScore = obj.checkpointScore;
  };

  GameState.prototype.updateScore = function (points) {
    this.score += points;
  };

  GameState.prototype.setLevel = function (level) {
    this.level = level;
  };

  GameState.prototype.updateCheckpoint = function () {
    if(this.level % 3 === 0){
      this.checkpoint = this.level;
      this.checkpointScore = this.score;
    }
  };

  return GameState;
}
