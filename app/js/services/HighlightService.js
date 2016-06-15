angular.module('regexpert')
       .service('HighlightService', ['$sce', function($sce) {

  this.getLetterMatchType = getLetterMatchType;
  this.compareLetterMatchType = compareLetterMatchType;
  this.createHighlight = createHighlight;
  this.multiHighlight = multiHighlight;

  function multiHighlight(text, target, search){
    var targetObj = getLetterMatchType(text, target, 'target');
    var searchObj = getLetterMatchType(text, search, 'search');
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
          resultArray.push({type: 'plain',text: el});
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
        }else if (objOneElType === "plain" & objTwoElType !== "plain") {
          finalArray.push({text: value.text, type: objTwoElType});
        }else if (objOneElType !== "plain" & objTwoElType === "plain") {
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
