describe('HighScoreController', function() {
  beforeEach(module('regexpert'));

  var highScore, GameService;

  var url = 'https://regexperts-back.herokuapp.com/high_scores';

  beforeEach(inject(function($controller, _GameService_, $httpBackend){
   highScores = $controller('HighScoreController');
   GameService = _GameService_;
   httpBackend = $httpBackend;
  }));

  beforeEach(function() {
    httpBackend.whenGET(/partials.*/).respond(200,'');
  });

  describe('#show', function() {
    it('gets highscores from db', function() {
      // highScores.add(101);
      // highScores.add(146);
      // expect(highScores.show()[0].score > highScores.show()[1].score).toEqual(true);
    });
  });

  describe('#add', function() {
    it('posts score to database', function() {
      highScore1 = {user: 'Julian', score: 101};
      httpBackend.expectPOST(url, {highScore: highScore1}).respond(201);
      highScores.add(highScore1.score, highScore1.user);
      httpBackend.flush();
    });
  });

  describe('#currentScore', function(){
    it('gets the current score from GameService', function() {
      GameService.loadGameState();
      expect(highScores.currentScore()).toEqual(0);
    });
  });
});
