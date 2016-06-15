angular.module('regexpert')
       .service('LevelService', ['LevelFactory', '$http', function(LevelFactory, $http){

  this.getLevel = getLevel;

  function getLevel(leverlNumber){
    return $http.get("/levels/levels.json").then(function(response){
      // return response.data.levels[leverlNumber-1];
      return new LevelFactory(response.data.levels[leverlNumber-1]);
    });

  }

}]);
