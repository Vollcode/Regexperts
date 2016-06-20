describe('HighlightService', function() {
  beforeEach(module('regexpert'));

  var input, output;

  beforeEach(inject(function(_HighlightService_){
    HighlightService = _HighlightService_;
  }));

  describe("#createHighlight", function(){
    beforeEach(function(){
      input = [{text: "a", type: null},{text: "b", type: "oneType"},{text: "c", type: "anotherType"}];
    });

    it('expect highlight both target and match', function(){
      output = "<span class='null'>a</span><span class='oneType'>b</span><span class='anotherType'>c</span>";
      expect(HighlightService.createHighlight(input).toString()).toEqual(output);
    });
  });
});
