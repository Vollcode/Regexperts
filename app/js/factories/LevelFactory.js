angular.module('regexpert')
       .factory('LevelFactory', function() {

<<<<<<< HEAD
   var Level = function(levelProperties) {
     this.number = levelProperties.id;
     this.text = levelProperties.text;
     this.target = levelProperties.target;
   };

   Level.prototype.isComplete = function (search) {
     return findOutput(this.text, this.target) === findOutput(this.text, search);
   };

   return Level;

   function makeRegexp(input) {
     return new RegExp(input, 'g');
   }

   function findOutput(text, input){
     var output = text.match(makeRegexp(input)) || [];
     return output.join('');
   }

=======
         var level = function(levelProperties) {
           this.number = levelProperties.id;
           this.text = levelProperties.text;
           this.target = levelProperties.target;
           this.mission = levelProperties.mission;
         };
         return level;
>>>>>>> 10f05c571895c086db1633f0ef1ad58c34f1eec9
});
