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
      expect(HighlightService.getLetterMatchType(text, target, 't')).toEqual(output);
    });

    it('highlight type decided at input', function(){
      output = [
        {text: 'a', type: 'n'},
        {text: 'b', type: 'p'},
        {text: 'c', type: 'n'},
        {text: 'b', type: 'p'}
      ];
      expect(HighlightService.getLetterMatchType(text, target, 'p')).toEqual(output);
    });
  });

  describe('#compareLetterMatchType',function(){
    beforeEach(function(){
      text = "abcb";
      targetOne = "b";
      targetTwo = "cb";
      s = HighlightService.getLetterMatchType(text, targetOne, 's');
      t = HighlightService.getLetterMatchType(text, targetTwo, 't');
    });

    it('if both types n then n', function(){
      var zipped = HighlightService.compareLetterMatchType(s,t);
      expect(zipped[0].type).toEqual('n');
    });
    it('if n and something else then something else', function(){
      var zipped = HighlightService.compareLetterMatchType(s,t);
      expect(zipped[1].type).toEqual('s');
    });
    it('if both something else then show both', function(){
      var zipped = HighlightService.compareLetterMatchType(s,t);
      expect(zipped[3].type).toEqual('s t');
    });
  });

  describe("#createHighlight", function(){
    beforeEach(function(){
      text = "abcb";
      targetRegex = "b";
      searchRegex = "cb";
      t = HighlightService.getLetterMatchType(text, targetRegex, 't');
      s = HighlightService.getLetterMatchType(text, searchRegex, 's');
    });

    it('expect highlight both target and match', function(){
      zipped = HighlightService.compareLetterMatchType(s,t);
      output = "<span class='n'>a</span><span class='t'>b</span><span class='s'>c</span><span class='s t'>b</span>";
      expect(HighlightService.createHighlight(zipped).toString()).toEqual(output);
    });
  });

  describe("#multiHighlight", function(){
    beforeEach(function(){
      text = "abcb";
      target = "b";
      search = "cb";
    });

    it('expect highlight both target and match', function(){
      output = "<span class='n'>a</span><span class='t'>b</span><span class='s'>c</span><span class='t s'>b</span>";
      expect(HighlightService.multiHighlight(text, target, search).toString()).toEqual(output);
    });
  });
});
