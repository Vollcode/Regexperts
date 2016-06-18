var str = 'Horse bHreeding is reproductio.';


var regexp1 = new RegExp("[a-z]\\s[a-g]", 'g');
var regexp2 = new RegExp("orse", 'g');


console.log(str.match(regexp2));

// function _makeDNA(str, regex, type) {
//
//   var matches = str.match(regex);
//
//   var deliniatedString = str.replace(regex,function(match){
//     return '∞' + match + '∞';
//   });
//
//   var splitString = deliniatedString.split('∞');
//
//   var resultArray = [];
//
//   splitString.forEach(function(section){
//     if(matches.includes(section)){
//       section.split('').forEach(function(el){
//         resultArray.push({ type: type, text: el});
//       });
//     }else{
//       section.split('').forEach(function(el){
//         resultArray.push({type: 'n',text: el});
//       });
//     }
//   });
//
//   return resultArray;
//
// }
//
// function _zipDNA(dnaOne,dnaTwo) {
//   finalArray = [];
//   dnaOne.forEach(function(value,index){
//     var v1 = value.type;
//     var v2 = dnaTwo[index].type;
//     if(v1 === 'n' && v2 === 'n'){
//       finalArray.push({text: value.text, type: 'n'});
//     }else if (v1 === 'n' && v2 === 's') {
//       finalArray.push({text: value.text, type: 's'});
//     }else if (v1 === 't' && v2 === 'n') {
//       finalArray.push({text: value.text, type: 't'});
//     }else {
//       finalArray.push({text: value.text, type: 'st'});
//     }
//   });
//   return finalArray;
// }
//
// console.log(_zipDNA(_makeDNA(str, regexp1, "t"),_makeDNA(str, regexp2, "s")));

// console.log(_makeDNA(str, regexp1));
// console.log(_makeDNA(str, regexp2));
