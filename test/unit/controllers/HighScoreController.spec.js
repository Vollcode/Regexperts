describe('HighScoreController', function() {
  beforeEach(module('regexpert'));

  var highScore, GameService;

  var url = 'https://regexperts-back.herokuapp.com/high_scores';

  var apiResponse = [
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
  ];
  var apiResponse2 = [
    {
      user: "Julian",
      score: 146,
      time: "2016-06-18T14:27:27.053Z",
    },
    {
      user: "Assange",
      score: 101,
      time: "2016-06-21T12:57:45.998Z",
    },
    {
      user: "Bob",
      score: 300,
      time: "2016-06-21T12:57:45.998Z",
    }
  ];

  beforeEach(inject(function($controller, _GameService_, $httpBackend){
   highScores = $controller('HighScoreController');
   GameService = _GameService_;
   httpBackend = $httpBackend;
  }));

  beforeEach(function() {
    httpBackend.expectGET(url).respond(apiResponse);
    httpBackend.whenGET(/partials.*/).respond(200,'');
    httpBackend.flush();
  });

  describe('#getScores', function() {
    it('gets highscores from db', function() {
      highScoreFromDB = {user: "Julian", score: 146, time: "2016-06-18T14:27:27.053Z"};
      httpBackend.expectGET(url).respond(apiResponse);
      highScores.getScores().then(function(response){
        expect(highScores.scores).toContain(highScoreFromDB);
      });
      httpBackend.flush();
    });
  });

  describe('#add', function() {
    beforeEach(function(){
      highScore1 = {user: 'Bob', score: 300};
      httpBackend.expectPOST(url, {highScore: highScore1}).respond(201);
      httpBackend.expectGET(url).respond(apiResponse2);
    });

    it('posts scores to db', function(){
      highScores.add(highScore1.score, highScore1.user);
      httpBackend.flush();
    });

    it('updates scores from db', function(){
      highScores.add(highScore1.score, highScore1.user);
      httpBackend.flush();
      expect(highScores.scores.length).toEqual(3);
    });

    it('can only be used once', function(){
      highScores.add(highScore1.score, highScore1.user);
      httpBackend.flush();
      expect(highScores.add(highScore1.score, highScore1.user)).toEqual(undefined);
    });
  });

  describe('#currentScore', function(){
    it('gets the current score from GameService', function() {
      GameService.loadGameState();
      expect(highScores.currentScore()).toEqual(0);
    });
  });
});
