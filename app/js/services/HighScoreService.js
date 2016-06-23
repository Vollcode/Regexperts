angular.module('regexpert')
       .service('HighScoreService', HighScoreService);

HighScoreService.$inject = ['$http', 'HighScoreFactory'];

function HighScoreService($http, HighScoreFactory) {

  var url = 'https://regexperts-back.herokuapp.com/high_scores';

  this.getHighScores = getHighScores;
  this.postHighScores = postHighScores;

  function getHighScores() {
    return $http.get(url).then(function(response){
      return response.data.map(function(highScoreData){
        return new HighScoreFactory(highScoreData);
      });
    });
  }

  function postHighScores(data) {
    return $http.post(url, {highScore: data});
  }
}
