angular.module('regexpert')
       .factory('LevelFactory', function() {

         var level = function(number, text, target) {
           this.number = number;
           this.text = text;
           this.target = target;
         };
         return level;
});
