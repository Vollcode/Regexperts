describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, levelText, expectation, text, regex, output, sce;

  beforeEach(inject(function($controller, $sce){
    game = $controller('GameController');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
    expectation = 'HPF';
    sce = $sce;
  }));

  it('has level text', function() {
    expect(game.levelText).toEqual(levelText);
  });

  it('has an expectation', function() {
    expect(game.expectation).toEqual(expectation);
  });

  describe('#isMatch',function(){
    it('when input matches expectation returns true',function(){
      expect(game.isMatch('\\b[HPF]')).toEqual(true);
    });

    it('when input doesnt match expectation returns false',function(){
      expect(game.isMatch('bad input')).toEqual(false);
    });
  });

  describe('#highlight', function(){
    beforeEach(function(){
      text = "Fe";
    });

    it('creats spans for all matches', function(){
      regex = "F";
      output = sce.trustAsHtml("<span class='highlighted'>F</span>e");
      expect(game.highlight(text, regex).toString()).toEqual(output.toString());
    });

    it('returns text if not match', function(){
      regex = "z";
      output = sce.trustAsHtml('Fe');
      expect(game.highlight(text, regex).toString()).toEqual(output.toString());
    });
  });
});
