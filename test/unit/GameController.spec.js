describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game;

  beforeEach(inject(function($controller){
    game = $controller('GameController');
  }));

  describe('#isWon',function(){
    it('when input matches expectation returns true',function(){
      expect(game.isWon('good input')).toEqual(true);
    });

    it('when input doesnt amtch expectation returnf false',function(){
      expect(game.isWon('bad input')).toEqual(false);
    });
  });

});
