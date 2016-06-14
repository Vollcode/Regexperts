describe('HighlightService', function() {
  beforeEach(module('regexpert'));

  var sce, HighlightService;

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
});
