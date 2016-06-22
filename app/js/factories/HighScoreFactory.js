angular.module('regexpert')
       .factory('HighScoreFactory', HighScoreFactory);

HighScoreFactory.$inject = [];

function HighScoreFactory(){
  var HighScore = function(highScoreDate){
    this.user = highScoreDate.user;
    this.score = highScoreDate.score;
    this.time = highScoreDate.created_at;
  };
  return HighScore;
}
