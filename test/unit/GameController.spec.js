describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, levelText, expectation, text, regex, output, sce;

  beforeEach(inject(function($controller, $sce){
    game = $controller('GameController');
    sce = $sce;
  }));

  describe('#isMatch',function(){
    it('when input matches expectation returns true',function(){
      expect(game.isMatch('\\b[a-z]..\\b')).toEqual(true);
    });

    it('when input doesnt match expectation returns false',function(){
      expect(game.isMatch('bad input')).toEqual(false);
    });
  });


});
