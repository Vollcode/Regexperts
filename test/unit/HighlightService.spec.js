describe('HighlightService', function() {
  beforeEach(module('regexpert'));

  var sce, HighlightService, text, target, output;

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
    // beforeEach(function(){
    //   text = "Some string";
    //   target = "me";
    //   searchString = 'g';
    // });

    // it('highlights the target', function() {
    //   output = sce.trustAsHtml("So<span class='highlight t'>me</span> string");
    //   expect(HighlightService.doubleHighlight(text, target).toString()).toEqual(output.toString());
    // });
    //
    // it('highlights the searchString', function() {
    //   output = sce.trustAsHtml("So<span class='highlight t'>me</span> strin<span class='highlight s'>g</span>");
    //   expect(HighlightService.doubleHighlight(text, target, searchString).toString()).toEqual(output.toString());
    // });


  });

  describe('#getLetterMatchType', function(){
    beforeEach(function(){
      text = "abcb";
      target = "b";
    });

    it('assigns each letter to an object which has a highlight match type', function(){
      output = [
        {text: 'a', type: 'n'},
        {text: 'b', type: 't'},
        {text: 'c', type: 'n'},
        {text: 'b', type: 't'}
      ];
      expect(HighlightService.splitIntoComponents(text, target, 't')).toEqual(output);
    });

    it('highlight type decided at input', function(){
      output = [
        {text: 'a', type: 'n'},
        {text: 'b', type: 'p'},
        {text: 'c', type: 'n'},
        {text: 'b', type: 'p'}
      ];
      expect(HighlightService.splitIntoComponents(text, target, 'p')).toEqual(output);
    });
  });

  describe('#compareLetterMatchType',function(){
    beforeEach(function(){
      text = "abcb";
      targetOne = "b";
      targetTwo = "cb";
      s = HighlightService.splitIntoComponents(text, targetOne, 's');
      t = HighlightService.splitIntoComponents(text, targetTwo, 't');
      var zipped = compareLetterMatchType(s,t);
    });

    it('if both types n then n', function(){
      expect(zipped[0].type).toEqaul('n');
    });
    it('if n and something else then something else', function(){
      expect(zipped[1].type).toEqaul('s');
    });
    it('if both something else then show both', function(){
      expect(zipped[3].type).toEqaul('st');
    });

  });
});
