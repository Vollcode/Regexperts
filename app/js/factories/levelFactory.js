angular.module('regexpert')
       .factory('levelFactory', function() {

  var Level = function(number, target, text) {
    this.number = number;
    this.target = target;
    this.text = text;
  };

  return Level;
});
