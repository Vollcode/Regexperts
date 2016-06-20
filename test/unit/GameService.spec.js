describe('GameService', function(){
  beforeEach(module('regexpert'));

  var GameService;

  beforeEach(inject(function(_GameService_){
    GameService = _GameService_;
    localStorage.setItem('currentScore', JSON.stringify(0));
  }));

  it('keeps track of the score',function(){
    expect(GameService.getScore()).toEqual(0);
  });

  describe('#updateScore', function(){
    it('changes the score by the given value', function(){
      GameService.updateScore(5);
      expect(GameService.getScore()).toEqual(5);
    });
  });

});
