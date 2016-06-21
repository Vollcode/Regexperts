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

  var level3 = {
        id:     3,
        number: 3,
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
    someState = new GameStateFactory({level: 5, score: 50, checkpoint: 3, checkpointScore: 30});
    checkpointState = new GameStateFactory({level: 3, score: 30, checkpoint: 3, checkpointScore: 30});
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
    beforeEach(function(){
      gameState2 = new GameStateFactory({level: 2, score: 0, checkpoint: 1, checkpointScore: 0});
      httpBackend.expectGET(url + '2').respond(level2);
      GameService.nextLevel();
      httpBackend.flush();
    });

    it('loads the next level', function(){
      expect(GameService.showGameState()).toEqual(gameState2);
    });

    it('updates the checkpoint information', function(){
      gameState3 = new GameStateFactory({level: 3, score: 0, checkpoint: 3, checkpointScore: 0});
      httpBackend.expectGET(url + '3').respond(level3);
      GameService.nextLevel();
      httpBackend.flush();
      expect(GameService.showGameState()).toEqual(gameState3);
    });
  });

  describe('#updateScore', function(){
    it('updates current gameState score', function(){
      GameService.updateScore(10);
      expect(GameService.showGameState().score).toEqual(10);
    });
  });

  describe('#checkPointState', function(){
    it('returns the state of the last checkpoint',function(){
      GameService.saveGameState(someState);
      GameService.getGameState();
      expect(GameService.checkPointState()).toEqual(checkpointState);
    });
  });
});
