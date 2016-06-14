angular.module('regexpert')
       .service('HighlightService', ['$sce', function($sce) {

  this.highlight = highlight;
  this.getLetterMatchType = getLetterMatchType;
  this.compareLetterMatchType = compareLetterMatchType;
  this.createHighlight = createHighlight;
  this.multiHighlight = multiHighlight;


  function highlight(text, searchString) {
    if (searchString){
      return _convertToHtml(text.replace(_makeRegexp(searchString), function(match){
        return "<span class='highlighted'>" + match + "</span>";
      }));
    }
    return _convertToHtml(text);
  }

  function multiHighlight(text, target, search){
    var targetObj = getLetterMatchType(text, target, 't');
    var searchObj = getLetterMatchType(text, search, 's');
    return createHighlight(compareLetterMatchType(targetObj, searchObj));
  }

  function createHighlight(zipped){
    finalStr = "";
    zipped.forEach(function(element){
      finalStr = finalStr + "<span class='" + element.type + "'>" +element.text + "</span>";
    });
    return _convertToHtml(finalStr);
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

  function compareLetterMatchType(objOne, objTwo){
    var finalArray = [];
    objOne.forEach(function(value, index){
        var objOneElType = value.type;
        var objTwoElType = objTwo[index].type;
        if(objOneElType === objTwoElType){
          finalArray.push({text: value.text, type: objOneElType});
        }else if (objOneElType === "n" & objTwoElType !== "n") {
          finalArray.push({text: value.text, type: objTwoElType});
        }else if (objOneElType !== "n" & objTwoElType === "n") {
          finalArray.push({text: value.text, type: objOneElType});
        }else {
          finalArray.push({text: value.text, type: objOneElType + ' ' + objTwoElType});
        }
    });
    return finalArray;
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
