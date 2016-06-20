angular.module('regexpert')
       .service('HighlightService', HighlightService);

HighlightService.$inject = ['$sce', 'MatchService'];

function HighlightService($sce, MatchService) {

  this.createHighlight = createHighlight;
  this.multiHighlight = multiHighlight;

  function createHighlight(input){
    return convertToHtml(input.reduce(function(pv, cv){
      return pv + "<span class='" + cv.type + "'>" + cv.text + "</span>";
    },""));
  }

  function multiHighlight(text, target, search){
    var targetObj = MatchService.getLetterMatchType(text, target, 'target');
    var searchObj = MatchService.getLetterMatchType(text, search, 'search');
    return createHighlight(MatchService.compareLetterMatchType(targetObj, searchObj));
  }

  function convertToHtml(text) {
    return $sce.trustAsHtml(text);
  }

}
