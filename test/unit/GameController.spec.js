describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, output, sce;

  beforeEach(inject(function($controller, $sce){
    game = $controller('GameController');
    sce = $sce;
  }));

  describe('#isMatch',function(){
    it('when input matches target returns true',function(){
      expect(game.isMatch('\\b[a-z]..\\b')).toEqual(true);
    });

    it('when input doesnt match target returns false',function(){
      expect(game.isMatch('bad input')).toEqual(false);
    });
  });


});
