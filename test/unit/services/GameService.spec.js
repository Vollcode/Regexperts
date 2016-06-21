describe('GameService', function(){
  beforeEach(module('regexpert'));

  var GameService, GameStateFactory, LevelFactory, httpBackend;

  var url = 'https://regexperts-back.herokuapp.com/levels/1';

  var level1 = {
        id:     1,
        number: 1,
        text:   "Hiya there buddy",
        target: "ya",
        keystrokelimit: 50
      };

  beforeEach(inject(function(_GameService_,_GameStateFactory_, _LevelFactory_, $httpBackend){
    GameService = _GameService_;
    GameStateFactory = _GameStateFactory_;
    LevelFactory = _LevelFactory_;
    httpBackend = $httpBackend;
    gameState = new GameStateFactory({level: 1, score: 0, checkpoint: 1, checkpointScore: 0});
    httpBackend.whenGET(/partials.*/).respond(200, '');
    GameService.getGameState();
  }));

  afterEach(function(){
    localStorage.removeItem('gameState');
  });

  describe("#getGameState", function(){
    it('if no gamestate in local storage then gets default state', function(){
      expect(GameService.showGameState()).toEqual(gameState);
    });
  });

  describe("#saveGameState", function(){
    it('saves the current state to local storage', function(){
      gameState = new GameStateFactory({level: 1, score: 10, checkpoint: 1, checkpointScore: 0});
      GameService.currentState.updateScore(10);
      GameService.saveGameState();
      GameService.getGameState();
      expect(GameService.showGameState()).toEqual(gameState);
    });
  });

  // describe('#setLevel', function(){
  //   it('creates a new level object',function(){
  //     level = new LevelFactory(level1);
  //     httpBackend.expectGET(url).respond(level1);
  //     GameService.setLevel();
  //     httpBackend.flush();
  //     expect(GameService.level).toEqual(level);
  //   });
  // });
  //
  // it('keeps track of the score',function(){
  //   expect(GameService.getScore()).toEqual(0);
  // });
  //
  // describe('#setScore', function(){
  //   it('changes the score by the given value', function(){
  //     GameService.setScore(5);
  //     expect(GameService.getScore()).toEqual(5);
  //   });
  // });
  //
  // describe('#resetScore', function() {
  //   it('sets score to 0', function() {
  //     GameService.setScore(10);
  //     GameService.resetScore();
  //     expect(GameService.getScore()).toEqual(0);
  //   });
  // });
  //
  // describe('#getCheckpoint', function() {
  //   it('starts at level 1, zero points', function() {
  //     checkpoint = {level: 1, score: 0};
  //     expect(GameService.getCheckpoint()).toEqual(checkpoint);
  //   });
  // });
  //
  // describe('#setCheckpoint', function() {
  //   it('save level number abd points if level number is divisible by 3', function() {
  //     checkpoint = {level: 3, score: 10};
  //     GameService.setScore(10);
  //     GameService.setCheckpoint(3);
  //     expect(GameService.getCheckpoint()).toEqual(checkpoint);
  //   });
  //
  //   it('does not change if not divisible by 3', function() {
  //     checkpoint = {level: 1, score: 0};
  //     GameService.setCheckpoint(2);
  //     expect(GameService.getCheckpoint()).toEqual(checkpoint);
  //   });
  // });
  //
  // describe('#resetCheckpoint', function() {
  //   it('sets checkpoint to 1', function() {
  //     GameService.setCheckpoint(3);
  //     GameService.resetCheckpoint();
  //     expect(GameService.getCheckpoint()).toEqual(1);
  //   });
  // });

});
