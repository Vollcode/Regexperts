regApp.controller('GameController', ["GameFactory", "$sce", "$scope", function(GameFactory, $sce, $scope) {
  this.string = new GameFactory();
  $scope.highlight = function(text, regex) {
  if(!regex) {
      return $sce.trustAsHtml(text);
  }
  return $sce.trustAsHtml(text.replace(new RegExp(regex), function(match) {
      return '<span class="highlightedText">' + match + '</span>';
  }));
};
}]);
