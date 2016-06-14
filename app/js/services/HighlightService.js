angular.module('regexpert')
       .service('HighlightService', ['$sce', function($sce) {

  this.highlight = highlight;
  this.splitIntoComponents = splitIntoComponents;
  // this.doubleHighlight = doubleHighlight;

  function highlight(text, searchString) {
    if (searchString){
      return _convertToHtml(text.replace(_makeRegexp(searchString), function(match){
        return "<span class='highlighted'>" + match + "</span>";
      }));
    }
    return _convertToHtml(text);
  }

  function getLetterMatchType(text, target, type) {
    var regex = _makeRegexp(target);
    var resultArray = [];
    var matches = text.match(regex);


    _splitAroundMatches(text,regex).forEach(function(section){
      if(matches.includes(section)){
        section.split('').forEach(function(el){
          resultArray.push({ type: type, text: el});
        });
      }else{
        section.split('').forEach(function(el){
          resultArray.push({type: 'n',text: el});
        });
      }
    });
    return resultArray;
  }

  function compareLetterMatchType (obj1, obj2){
    
  }


  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }


  function _convertToHtml(text) {
    return $sce.trustAsHtml(text);
  }


  function _splitAroundMatches(text,regex){
    return text.replace(regex,function(match){
      return '∞' + match + '∞';
    }).split('∞');
  }

}]);
