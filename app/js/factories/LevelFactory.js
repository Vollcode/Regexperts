angular.module('regexpert')
       .factory('LevelFactory', function() {

         var level = function(levelProperties) {
           this.number = levelProperties.number;
           this.text = levelProperties.text;
           this.target = levelProperties.target;
         };
         return level;
});
