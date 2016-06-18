angular.module('regexpert')
       .service('LevelService', LevelService);

LevelService.$inject = ['LevelFactory', '$http'];

function LevelService(LevelFactory, $http){

  var url = 'https://regexperts-back.herokuapp.com/levels/';

  this.getLevel = getLevel;

  function getLevel(levelNumber){
    return $http.get(url + levelNumber).then(function(response){
      return new LevelFactory(response.data);
    });
  }
}
