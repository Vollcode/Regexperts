describe('MatchService', function() {
  beforeEach(module('regexpert'));

  var MatchService, text, target, search, output;

  beforeEach(inject(function(_MatchService_){
    MatchService = _MatchService_;
  }));

  describe('#getLetterMatchType', function(){
    beforeEach(function(){
      text = "abcb";
      target = "b";
    });

    it('assigns each letter to an object which has a highlight match type', function(){
      output = [
        {text: 'a', type: null},
        {text: 'b', type: 'highlight'},
        {text: 'c', type: null},
        {text: 'b', type: 'highlight'}
      ];
      expect(MatchService.getLetterMatchType(text, target, 'highlight')).toEqual(output);
    });

    it('can choose different highlight types', function(){
      output = [
        {text: 'a', type: null},
        {text: 'b', type: 'different'},
        {text: 'c', type: null},
        {text: 'b', type: 'different'}
      ];
      expect(MatchService.getLetterMatchType(text, target, 'different')).toEqual(output);
    });

    it('if no matches all text is marked as null',function(){
        target = "\\d";
        output = [
          {text: 'a', type: null},
          {text: 'b', type: null},
          {text: 'c', type: null},
          {text: 'b', type: null}
        ];
        expect(MatchService.getLetterMatchType(text, target, 'different')).toEqual(output);
    });

    it('if regex is invalid all text is marked as null',function(){
        target = "[a-";
        output = [
          {text: 'a', type: null},
          {text: 'b', type: null},
          {text: 'c', type: null},
          {text: 'b', type: null}
        ];
        expect(MatchService.getLetterMatchType(text, target, 'different')).toEqual(output);
    });
  });

  describe('#compareLetterMatchType',function(){
    beforeEach(function(){
      text = "abcb";
      search = "b";
      target = "cb";
      s = MatchService.getLetterMatchType(text, search, 'search');
      t = MatchService.getLetterMatchType(text, target, 'target');
    });

    it('if both types are null then choose null', function(){
      var zipped = MatchService.compareLetterMatchType(s,t);
      expect(zipped[0].type).toEqual(null);
    });

    it('if one type is null and the other is not then choose the other', function(){
      var zipped = MatchService.compareLetterMatchType(s,t);
      expect(zipped[1].type).toEqual('search');
    });

    it('if neither types are null then show both types', function(){
      var zipped = MatchService.compareLetterMatchType(s,t);
      expect(zipped[3].type).toEqual('search target');
    });
  });
});
