describe('HighlightService', function() {
  beforeEach(module('regexpert'));

  var sce, HighlightService, text, target, output;

  beforeEach(inject(function($sce, _HighlightService_){
    sce = $sce;
    HighlightService = _HighlightService_;

  }));

  describe('#getLetterMatchType', function(){
    beforeEach(function(){
      text = "abcb";
      target = "b";
    });

    it('assigns each letter to an object which has a highlight match type', function(){
      output = [
        {text: 'a', type: 'plain'},
        {text: 'b', type: 't'},
        {text: 'c', type: 'plain'},
        {text: 'b', type: 't'}
      ];
      expect(HighlightService.getLetterMatchType(text, target, 't')).toEqual(output);
    });

    it('highlight type decided at input', function(){
      output = [
        {text: 'a', type: 'plain'},
        {text: 'b', type: 'p'},
        {text: 'c', type: 'plain'},
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
      expect(zipped[0].type).toEqual('plain');
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
      output = "<span class='plain'>a</span><span class='t'>b</span><span class='s'>c</span><span class='s t'>b</span>";
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
      output = "<span class='plain'>a</span><span class='target'>b</span><span class='search'>c</span><span class='target search'>b</span>";
      expect(HighlightService.multiHighlight(text, target, search).toString()).toEqual(output);
    });
  });
});
