angular.module('regexpert')
       .service('HighScoreService', HighScoreService);

HighScoreService.$inject = ['$http'];

function HighScoreService($http) {

  var url = 'https://regexperts-back.herokuapp.com/high_scores';

  this.getHighScores = getHighScores;
  this.postHighScores = postHighScores;

  function getHighScores() {
    return $http.get(url).then(function(response){
      return response.data.highScores;
    });
  }

  function postHighScores(data) {
    return $http.post(url, {highScore: data});
  }
}
