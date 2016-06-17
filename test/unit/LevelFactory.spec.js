describe('LevelFactory', function(){
  beforeEach(module('regexpert'));

  var level;

  beforeEach(inject(function(LevelFactory) {
    level = new LevelFactory({id: 1, number: 1, text:"Hiya there buddy 33", target: "\\d.", mission: "This is your mission"});
  }));

  it('has the correct level number', function(){
    expect(level.number).toEqual(1);
  });

  it('has the correct level text', function(){
    expect(level.text).toEqual('Hiya there buddy 33');
  });

  it('has the correct level text', function(){
    expect(level.target).toEqual('\\d.');
  });

  it('has the correct mission text', function() {
    expect(level.mission).toEqual('This is your mission');
  });

  describe('#isComplete', function(){
    it('returns true when input matches the target', function(){
      expect(level.isComplete(level.target)).toEqual(true);
    });

    it('returns true when input regex appied to level text matches target regex', function(){
      expect(level.isComplete("33")).toEqual(true);
    });

    it('returns false when target creates no matches', function(){
      expect(level.isComplete("21")).toEqual(false);
    });
  });

});
