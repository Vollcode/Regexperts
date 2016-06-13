angular.module('regexpert')
       .controller('GameController',[ function(){

  var vm = this;
  
  vm.isWon = isWon;
  vm.expectation = "good input";



  function isWon(input) {
    return input === vm.expectation;
  }




}]);
