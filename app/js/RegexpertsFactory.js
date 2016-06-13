regApp.factory('GameFactory', function() {
  var sentence = function(sentenceText){
    this.text = sentenceText;
  };
  return sentence;
});
