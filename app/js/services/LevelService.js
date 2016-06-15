angular.module('regexpert')
       .service('LevelService', ['LevelFactory', '$http', function(LevelFactory, $http){

  this.getLevel = getLevel;

  function getLevel(levelNumber){
    return $http.get("/levels/levels.json").then(function(response){
      // return response.data.levels[levelNumber-1];
      return new LevelFactory(response.data.levels[levelNumber-1]);
    });

  }

}]);
