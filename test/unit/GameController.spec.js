describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, levelText, expectation;

  beforeEach(inject(function($controller){
    game = $controller('GameController');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
    expectation = 'HPF';
  }));

  it('has level text', function() {
    expect(game.levelText).toEqual(levelText);
  });

  it('has an expectation', function() {
    expect(game.expectation).toEqual(expectation);
  });

  describe('#isWon',function(){
    it('when input matches expectation returns true',function(){
      expect(game.isWon('\\b[HPF]')).toEqual(true);
    });

    it('when input doesnt amtch expectation returnf false',function(){
      expect(game.isWon('bad input')).toEqual(false);
    });
  });

});
