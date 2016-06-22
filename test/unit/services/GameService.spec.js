describe('GameService', function(){
  beforeEach(module('regexpert'));

  var GameService, GameStateFactory;

  beforeEach(inject(function(_GameService_,_GameStateFactory_){
    GameService = _GameService_;
    GameStateFactory = _GameStateFactory_;
    defaultState       = new GameStateFactory({level: 1, score: 0, checkpoint: 1, checkpointScore: 0, hintDisplayed: false});
    GameService.loadGameState();
  }));

  afterEach(function(){
    localStorage.removeItem('gameState');
  });

  describe("#loadGameState", function(){
    it('if no gamestate in local storage then gets default state', function(){
      expect(GameService.getGameState()).toEqual(defaultState);
    });
  });

  describe("#saveGameState", function(){
    it('saves the current state to local storage', function(){
      newState       = new GameStateFactory({level: 1, score: 10, checkpoint: 1, checkpointScore: 0, hintDisplayed: false});
      GameService.loadGameState();
      GameService.currentState.updateScore(10);
      GameService.saveGameState(GameService.getGameState());
      expect(GameService.getGameState()).toEqual(newState);
    });
  });

  describe('#getNextLevel', function(){
    beforeEach(function(){
      level2state       = new GameStateFactory({level: 2, score: 10, checkpoint: 1, checkpointScore: 0});
      GameService.saveGameState(level2state);
      GameService.loadGameState();
      nextLevel = GameService.getNextLevel(GameService.getGameState(),10);
    });

    it('return a state with the level increased by 1', function(){
      expect(nextLevel.level).toEqual(3);
    });

    it('return a state with an increased score', function(){
      expect(nextLevel.score).toEqual(20);
    });

    it('return a state with updated checkpoint', function(){
      expect(nextLevel.checkpoint).toEqual(3);
    });

    it('return a state with updated checkpoint score', function(){
      expect(nextLevel.checkpointScore).toEqual(20);
    });
  });

  describe('#getCheckPoint', function(){
    it('returns the state of the last checkpoint',function(){
      someState       = new GameStateFactory({level: 5, score: 50, checkpoint: 3, checkpointScore: 30, hintDisplayed: true});
      getCheckPoint = new GameStateFactory({level: 3, score: 30, checkpoint: 3, checkpointScore: 30, hintDisplayed: false});
      GameService.saveGameState(someState);
      expect(GameService.getCheckPoint(GameService.getGameState())).toEqual(getCheckPoint);
    });
  });
});
