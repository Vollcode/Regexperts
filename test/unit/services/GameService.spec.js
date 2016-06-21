describe('GameService', function(){
  beforeEach(module('regexpert'));

  var GameService, GameStateFactory, LevelFactory, httpBackend;

  var url = 'https://regexperts-back.herokuapp.com/levels/';

  var level2 = {
        id:     2,
        number: 2,
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
      GameService.saveGameState(GameService.showGameState());
      GameService.getGameState();
      expect(GameService.showGameState()).toEqual(gameState);
    });
  });

  describe('#nextLevel', function(){
    it('loads the next level', function(){
      gameState2 = new GameStateFactory({level: 2, score: 0, checkpoint: 1, checkpointScore: 0});
      httpBackend.expectGET(url + '2').respond(level2);
      GameService.nextLevel();
      httpBackend.flush();
      expect(GameService.showGameState()).toEqual(gameState2);
    });
  });

  describe('#updateScore', function(){
    it('updates current gameState score', function(){
      GameService.updateScore(10);
      expect(GameService.showGameState().score).toEqual(10);
    });
  });
});
