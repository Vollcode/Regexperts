describe('HighScoreController', function() {
  beforeEach(module('regexpert'));

  var highScore;

  beforeEach(inject(function($controller){
   highScores = $controller('HighScoreController');
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
});
