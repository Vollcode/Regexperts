describe('LevelFactory', function(){
  beforeEach(module('regexpert'));

  var level;

  beforeEach(inject(function(LevelFactory) {
    level = new LevelFactory({id: 1, text:"Hiya there buddy", target: "ya", mission: "This is your mission"});
  }));

    it('has the correct level number', function(){
      expect(level.number).toEqual(1);
    });

    it('has the correct level text', function(){
      expect(level.text).toEqual('Hiya there buddy');
    });

    it('has the correct level text', function(){
      expect(level.target).toEqual('ya');
    });

    it('has the correct mission text', function() {
      expect(level.mission).toEqual('This is your mission');
    });
});
