describe('HighlightService', function() {
  beforeEach(module('regexpert'));

  var sce, HighlightService, text, target, search, output;

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
        {text: 'b', type: 'highlight'},
        {text: 'c', type: 'plain'},
        {text: 'b', type: 'highlight'}
      ];
      expect(HighlightService.getLetterMatchType(text, target, 'highlight')).toEqual(output);
    });

    it('can choose different highlight types', function(){
      output = [
        {text: 'a', type: 'plain'},
        {text: 'b', type: 'different'},
        {text: 'c', type: 'plain'},
        {text: 'b', type: 'different'}
      ];
      expect(HighlightService.getLetterMatchType(text, target, 'different')).toEqual(output);
    });
  });

  describe('#compareLetterMatchType',function(){
    beforeEach(function(){
      text = "abcb";
      search = "b";
      target = "cb";
      s = HighlightService.getLetterMatchType(text, search, 'search');
      t = HighlightService.getLetterMatchType(text, target, 'target');
    });

    it('if both types are plain then choose plain', function(){
      var zipped = HighlightService.compareLetterMatchType(s,t);
      expect(zipped[0].type).toEqual('plain');
    });
    it('if one type is plain and the other is not then choose the other', function(){
      var zipped = HighlightService.compareLetterMatchType(s,t);
      expect(zipped[1].type).toEqual('search');
    });
    it('if neither types are plain then show both types', function(){
      var zipped = HighlightService.compareLetterMatchType(s,t);
      expect(zipped[3].type).toEqual('search target');
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
