describe('HighScoreController', function() {
  beforeEach(module('regexpert'));

  var highScore, GameService;

  beforeEach(inject(function($controller, _GameService_){
   highScores = $controller('HighScoreController');
   GameService = _GameService_;
  }));

  describe('#show', function() {
    it('show highscores in descending score order', function() {
      highScores.add(101);
      highScores.add(146);
      expect(highScores.show()[0].score > highScores.show()[1].score).toEqual(true);
    });
  });

  describe('#add', function() {
    it('adds score', function() {
      highScores.add(101);
      expect(highScores.show()[0].score).toEqual(101);
    });

    it('adds the time score was set', function() {
      highScores.add(101);
      expect(highScores.show()[0].time).toEqual(jasmine.any(Date));
    });

    it('adds the username', function() {
      highScores.add(101, 'Julian');
      expect(highScores.show()[0].user).toEqual('Julian');
    });
  });

  describe('#currentScore', function(){
    it('gets the current score from GameService', function() {
      GameService.loadGameState();
      expect(highScores.currentScore()).toEqual(0);
    });
  });
});
