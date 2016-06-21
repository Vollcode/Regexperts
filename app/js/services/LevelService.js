angular.module('regexpert')
       .service('LevelService', LevelService);

LevelService.$inject = ['LevelFactory', '$http'];

function LevelService(LevelFactory, $http){

  var url = 'https://regexperts-back.herokuapp.com/levels/';

  this.getLevel = getLevel;
  this.storeLevelNumber = storeLevelNumber;

  function getLevel(levelNumber){
    return $http.get(url + levelNumber).then(function(response){
      return new LevelFactory(response.data);
    });
  }

  function storeLevelNumber(levelNumber) {
    localStorage.setItem('currentLevel', JSON.stringify(levelNumber));
  }

}
