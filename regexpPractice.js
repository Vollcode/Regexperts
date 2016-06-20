var str = 'Horse bHreeding is reproductio.';


var regexp1 = new RegExp("[a-z]\\s[a-g]", 'g');
var regexp2 = new RegExp("orse", 'g');


function labelMatches(array, matches, type){
  return array.map(function(section){
    if (matches.includes(section)) {
      return {value: section, type: type};
    } else {
      return {value: section, type: null};
    }
  });
}

function splitToLetter(array){
  console.log(array);
  return array.reduce(function(arr,section){
    return arr.concat(section.value.split('').reduce(function(arr,letter){
      return arr.concat({value: letter, type: section.type});
    },[]));
  },[]);
}

function splitAroundMatches(text,regex){
  return text.replace(regex,function(match){
    return '∞' + match + '∞';
  }).split('∞');
}


var matches = str.match(regexp2);

// console.log(labelMatches(splitAroundMatches(str,regexp1),matches,"search"));
// console.log(splitToLetter(labelMatches(splitAroundMatches(str,regexp1),matches,"search")));
console.log(splitToLetter(labelMatches(splitAroundMatches(str,regexp2),matches,"target")));
