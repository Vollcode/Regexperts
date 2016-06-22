angular.module('regexpert')
       .factory('LevelFactory', LevelFactory);

function LevelFactory() {

  var Level = function(levelProperties) {
    this.number = levelProperties.number;
    this.text = levelProperties.text;
    this.target = levelProperties.target;
    this.mission = levelProperties.mission;
    this.keystrokelimit = levelProperties.keystrokelimit;
    this.hint = levelProperties.hint;
  };

  Level.prototype.isComplete = function (search) {
    return findOutput(this.text, this.target) === findOutput(this.text, search);
  };

  Level.prototype.reduceKeyLimit = function (input) {
    if(input !== 'Enter'){this.keystrokelimit --;}
  };

  Level.prototype.isLost = function () {
    return this.keystrokelimit <= 0;
  };

  return Level;

  function makeRegexp(input) {
    try{
      return new RegExp(input, 'g');
    }catch(err){
      return new RegExp("", 'g');
    }
  }

  function findOutput(text, input){
    var output = text.match(makeRegexp(input)) || [];
    return output.join('');
  }
}
