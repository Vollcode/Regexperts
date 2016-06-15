angular.module('regexpert')
       .service('LevelService', ['$http', function($http){

  this.getLevel = getLevel;

  function getLevel(leverlNumber){
    return $http.get("/levels/levels.json").then(function(response){
      return response.data.levels[leverlNumber-1];
    });

  }

}]);
