describe('GameService', function(){
  beforeEach(module('regexpert'));

  var GameService;

  beforeEach(inject(function(_GameService_){
    GameService = _GameService_;
    localStorage.setItem('currentScore', JSON.stringify(0));
    localStorage.setItem('checkpoint', JSON.stringify(1));
  }));

  it('keeps track of the score',function(){
    expect(GameService.getScore()).toEqual(0);
  });

  describe('#setScore', function(){
    it('changes the score by the given value', function(){
      GameService.setScore(5);
      expect(GameService.getScore()).toEqual(5);
    });
  });

  describe('#resetScore', function() {
    it('sets score to 0', function() {
      GameService.setScore(10);
      GameService.resetScore();
      expect(GameService.getScore()).toEqual(0);
    });
  });

  describe('#getCheckpoint', function() {
    it('starts at level 1', function() {
      expect(GameService.getCheckpoint()).toEqual(1);
    });
  });

  describe('#setCheckpoint', function() {
    it('if level number is divisible by 3', function() {
      GameService.setCheckpoint(3);
      expect(GameService.getCheckpoint()).toEqual(3);
    });

    it('does not change if not divisible by 3', function() {
      GameService.setCheckpoint(2);
      expect(GameService.getCheckpoint()).toEqual(1);
    });
  });

  describe('#resetCheckpoint', function() {
    it('sets checkpoint to 1', function() {
      GameService.setCheckpoint(3);
      GameService.resetCheckpoint();
      expect(GameService.getCheckpoint()).toEqual(1);
    });
  });

});
