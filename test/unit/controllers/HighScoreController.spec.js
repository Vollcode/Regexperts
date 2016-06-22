describe('HighScoreController', function() {
  beforeEach(module('regexpert'));

  var highScore, GameService;

  var url = 'https://regexperts-back.herokuapp.com/high_scores';

  var response = {highScores: [
    {
      user: "Julian",
      score: 146,
      time: "2016-06-18T14:27:27.053Z",
    },
    {
      user: "Assange",
      score: 101,
      time: "2016-06-21T12:57:45.998Z",
    }
  ]};

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
      highScoreFromDB = {user: "Julian", score: 146, time: "2016-06-18T14:27:27.053Z"};
      httpBackend.expectGET(url).respond(response);
      highScores.show().then(function(response){
        expect(response).toContain(highScoreFromDB);
      });
      httpBackend.flush();
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
