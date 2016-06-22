describe('HighScoreService', function() {

  beforeEach(module('regexpert'));

  var HighScoreService, highScore1, highScoreData, httpBackend, url, response;

  url = 'https://regexperts-back.herokuapp.com/high_scores';
  APIresponse = [
    {
      user: "Julian",
      score: 146,
      created_at: "2016-06-18T14:27:27.053Z",
    },
    {
      user: "Assange",
      score: 101,
      created_at: "2016-06-21T12:57:45.998Z",
    }
  ];

  highScoreDate = {
    user: "Julian",
    score: 146,
    created_at: "2016-06-18T14:27:27.053Z",
  };

  beforeEach(inject(function(_HighScoreService_, $httpBackend, HighScoreFactory){
    HighScoreService = _HighScoreService_;
    httpBackend = $httpBackend;
    highScore1 = new HighScoreFactory(highScoreDate);
  }));

  beforeEach(function() {
    httpBackend.whenGET(/partials.*/).respond(200,'');
  });

  describe('#getHighScores', function() {
    it('gets highscores from backend', function() {
      httpBackend.expectGET(url).respond(APIresponse);
      HighScoreService.getHighScores().then(function(response){
        expect(response).toContain(highScore1);
      });
      httpBackend.flush();
    });
  });

  describe('#postHighScores', function() {
    it('sent highscore to the backend', function() {
      httpBackend.expectPOST(url, {highScore: highScore1}).respond(201);
      HighScoreService.postHighScores(highScore1).then(function(response) {
        expect(response.status).toEqual(201);
      });
      httpBackend.flush();
    });
  });
});
