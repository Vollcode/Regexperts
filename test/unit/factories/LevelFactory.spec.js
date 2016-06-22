describe('LevelFactory', function(){
  beforeEach(module('regexpert'));

  var level;

  beforeEach(inject(function(LevelFactory) {
    level = new LevelFactory({id: 1, number: 1, text:"Hiya there buddy 33", target: "\\d.", mission: "This is your mission", keystrokelimit: 50, hint: 'Work harder mate'});
  }));

  it('has the correct level number', function(){
    expect(level.number).toEqual(1);
  });

  it('has the correct level text', function(){
    expect(level.text).toEqual('Hiya there buddy 33');
  });

  it('has the correct level target', function(){
    expect(level.target).toEqual('\\d.');
  });

  it('has the correct mission text', function() {
    expect(level.mission).toEqual('This is your mission');
  });

  it('has the correct keystroke limit', function() {
    expect(level.keystrokelimit).toEqual(50);
  });

  it('has the correct hint', function(){
    expect(level.hint).toEqual('Work harder mate');
  });

  describe('#reduceKeyLimit', function(){
    it('reduces the keyStroke limit by 1', function(){
      level.reduceKeyLimit('something');
      expect(level.keystrokelimit).toEqual(49);
    });

    it('does not reduce if keystroke is "enter"',function(){
      level.reduceKeyLimit('Enter');
      expect(level.keystrokelimit).toEqual(50);
    });
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

  describe('#isLost', function (){
    it('returns true when keystroke limit reaches zero', function() {
      while( level.keystrokelimit > 0){
        level.reduceKeyLimit();
      }
      expect(level.isLost()).toEqual(true);
    });

    it('returns false if keystroke limit is greater than zero', function() {
      while( level.keystrokelimit > 1){
        level.reduceKeyLimit();
      }
      expect(level.isLost()).toEqual(false);
    });
  });

});
