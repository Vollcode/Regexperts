angular.module('regexpert')
       .controller('GameController', ["$sce", "$scope", function($sce, $scope) {

  $scope.highlight = function(text, regex) {
    if(!regex) {
        return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(new RegExp(regex, 'g'), function(match) {
        return '<span class="highlightedText">' + match + '</span>';
    }));
  };
}]);
