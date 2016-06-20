angular.module('regexpert')
       .service('MatchService', MatchService);

MatchService.$inject = [];

function MatchService() {

  this.getLetterMatchType = getLetterMatchType;
  this.compareLetterMatchType = compareLetterMatchType;

  function compareLetterMatchType(objOne, objTwo){
    return objOne.map(function(el,index){
      var objOneElType = el.type;
      var objTwoElType = objTwo[index].type;
      if((objOneElType && objTwoElType) === null){
        return {text: el.text, type: objOneElType || objTwoElType};
      }
      return {text: el.text, type: objOneElType + ' ' + objTwoElType};
    });
  }

  function getLetterMatchType(text, captureGroup, matchType) {
    var regexp = makeRegexp(captureGroup);
    var matches = text.match(regexp) || [];
    return splitToLetter(labelMatches(splitAroundMatches(text,regexp),matches,matchType));
  }

  function labelMatches(array, matches, type){
    return array.map(function(section){
      if (matches.includes(section)) {
        return {text: section, type: type};
      } else {
        return {text: section, type: null};
      }
    });
  }

  function splitToLetter(array){
    return array.reduce(function(arr,section){
      return arr.concat(section.text.split('').reduce(function(arr,letter){
        return arr.concat({text: letter, type: section.type});
      },[]));
    },[]);
  }

  function splitAroundMatches(text,regex){
    return text.replace(regex,function(match){
      return 'π' + match + 'π';
    }).split('π');
  }

  function makeRegexp(input) {
    try{
      return new RegExp(input, 'g');
    }catch(err){
      return new RegExp("", 'g');
    }
  }
}
