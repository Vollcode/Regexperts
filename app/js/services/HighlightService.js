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
    return convertToHtml(finalStr);
  }



  function getLetterMatchType(text, captureGroup, matchType) {
    var regex = makeRegexp(captureGroup);
    var resultArray = [];
    var matches = text.match(regex);

    splitAroundMatches(text,regex).forEach(function(section){
      if(matches.includes(section)){
        convertToObjectsWithType(section, matchType, resultArray);
      }else{
        convertToObjectsWithType(section, 'plain', resultArray);
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

  function makeRegexp(input) {
    return new RegExp(input, 'g');
  }

  function convertToHtml(text) {
    return $sce.trustAsHtml(text);
  }

  function convertToObjectsWithType(textSection,matchType, resultArray){
    textSection.split('').forEach(function(el){
      resultArray.push({ type: matchType, text: el});
    });
  }

  function splitAroundMatches(text,regex){
    return text.replace(regex,function(match){
      return '∞' + match + '∞';
    }).split('∞');
  }
}]);
