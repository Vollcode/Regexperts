angular.module('regexpert')
       .service('HighlightService', ['$sce', function($sce) {

  this.highlight = highlight;
  this.doubleHighlight = doubleHighlight;

  function highlight(text, searchString) {
    if (searchString){
      return _convertToHtml(text.replace(_makeRegexp(searchString), function(match){
        return "<span class='highlighted'>" + match + "</span>";
      }));
    }
    return _convertToHtml(text);
  }

  function doubleHighlight(text, target, searchString) {

    firstHighlight = (text.replace(_makeRegexp(target), function(match){
      return "<span class='highlight t'>" + match + "</span>";
    }));

    if(searchString){
      return _convertToHtml(firstHighlight.replace(_makeRegexp(searchString), function(match){
        return "<span class='highlight s'>" + match + "</span>";
      }));
    }
    
    return _convertToHtml(firstHighlight);
  }

  function _makeRegexp(input) {
    return new RegExp(input, 'g');
  }

  function _convertToHtml(text) {
    return $sce.trustAsHtml(text);
  }
}]);
