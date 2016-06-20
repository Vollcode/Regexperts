var str = 'Horse bHreeding is reproductio.';


var regexp1 = new RegExp("[a-z]\\s[a-g]", 'g');
var regexp2 = new RegExp("\\s", 'g');


function labelMatches(array, regex, type){
  var matches = str.match(regex);
  return array.map(function(section){
    if (matches.includes(section)) {
      return {value: section, type: type};
    } else {
      return {value: section, type: null};
    }
  });
}

function splitToLetter(array){
  return array.reduce(function(arr,section){
    return arr.concat(section.value.split('').reduce(function(arr,letter){
      return arr.concat({value: letter, type: section.type});
    },[]));
  },[]);
}

function splitAroundMatches(text,regex){
  return text.replace(regex,function(match){
    return 'π' + match + 'π';
  }).split('π');
}

var matches = str.match(regexp2);

// console.log(labelMatches(splitAroundMatches(str,regexp1),matches,"search"));
console.log(splitToLetter(labelMatches(splitAroundMatches(str,regexp1),regexp1,"search")));
console.log(splitToLetter(labelMatches(splitAroundMatches(str,regexp2),regexp2,"target")));
