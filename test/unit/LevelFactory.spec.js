describe('LevelFactory', function(){
  beforeEach(module('regexpert'));

  var level;

  beforeEach(inject(function(LevelFactory) {
    level = new LevelFactory(1, 'Hello World', 'Hello');
  }));

    it('has the correct level number', function(){
      expect(level.number).toEqual(1);
    });

    it('has the correct level text', function(){
      expect(level.text).toEqual('Hello World');
    });

    it('has the correct level text', function(){
      expect(level.target).toEqual('Hello');
    });
});
