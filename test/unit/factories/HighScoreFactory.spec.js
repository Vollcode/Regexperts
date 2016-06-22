describe('HighScoreFactory', function(){
  beforeEach(module('regexpert'));

  var highScore, highScoreData;

  highScoreData = {user: "Assange", score: 2000, created_at: "2016-06-18T14:27:27.053Z"};

  beforeEach(inject(function(HighScoreFactory){
    highScore = new HighScoreFactory(highScoreData);
  }));

  it('has a user', function(){
    expect(highScore.user).toEqual("Assange");
  });

  it('has a score', function(){
    expect(highScore.score).toEqual(2000);
  });

  it('has a created time', function(){
    expect(highScore.time).toEqual("2016-06-18T14:27:27.053Z");
  });
});
