describe('HighlightService', function() {
  beforeEach(module('regexpert'));

  var sce, HighlightService, text, target;

  beforeEach(inject(function($sce, _HighlightService_){
    sce = $sce;
    HighlightService = _HighlightService_;

  }));

  describe('#highlight', function(){
    beforeEach(function(){
      text = "Fe";
    });

    it('creates spans for all matches', function(){
      regex = "F";
      output = sce.trustAsHtml("<span class='highlighted'>F</span>e");
      expect(HighlightService.highlight(text, regex).toString()).toEqual(output.toString());
    });

    it('returns text if not match', function(){
      regex = "z";
      output = sce.trustAsHtml('Fe');
      expect(HighlightService.highlight(text, regex).toString()).toEqual(output.toString());
    });
  });

  describe('#doubleHighlight', function() {
    beforeEach(function(){
      text = "Some string";
      target = "me";
      searchString = 'g';
    });

    it('highlights the target', function() {
      output = sce.trustAsHtml("So<span class='highlight t'>me</span> string");
      expect(HighlightService.doubleHighlight(text, target).toString()).toEqual(output.toString());
    });

    it('highlights the searchString', function() {
      output = sce.trustAsHtml("So<span class='highlight t'>me</span> strin<span class='highlight s'>g</span>");
      expect(HighlightService.doubleHighlight(text, target, searchString).toString()).toEqual(output.toString());
    });
  });
});
