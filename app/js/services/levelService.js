angular.module('regexpert',[])
        .service('levelService',['$http', 'levelFactory', function($http, levelFactory){

          // this.getLevels = function() {
          //   console.log($http.get('gameLevels.json').then(_parseLevelData));
          //   return $http.get('gameLevels.json').then(_parseLevelData);
          // };

          this.printlevels = function() {
            return $http.get('gameLevels.json').then(function(response){
              return levels[2].text;
            });
          };

          // function _parseLevelData (response) {
          //   return response.data.map(function(levelData){
          //     return new levelFactory(levelData.number, levelData.target, levelData.text);
          //   });
          // }

        }]);
