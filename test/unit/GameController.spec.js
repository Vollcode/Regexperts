describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, output, sce;

  beforeEach(inject(function($controller, $sce){
    game = $controller('GameController');
    sce = $sce;
  }));

  describe('#nextLevel', function() {
    it('can change to level 2', function () {
      game.nextLevel();
      expect(game.currentLevel.value).toEqual(2);
    });
  });

  describe('#isMatch',function(){
    it('when input matches target returns true',function(){
      expect(game.isMatch('\\b[a-z]..\\b')).toEqual(true);
    });

    it('when input doesnt match target returns false',function(){
      expect(game.isMatch('bad input')).toEqual(false);
    });
  });


});
