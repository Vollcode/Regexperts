describe('GameService', function(){
  beforeEach(module('regexpert'));

  var GameService, GameStateFactory;

  beforeEach(inject(function(_GameService_,_GameStateFactory_){
    GameService = _GameService_;
    GameStateFactory = _GameStateFactory_;
    defaultState       = new GameStateFactory({level: 1, score: 0, checkpoint: 1, checkpointScore: 0});
    GameService.setGameState();
  }));

  afterEach(function(){
    localStorage.removeItem('gameState');
  });

  describe("#setGameState", function(){
    it('if no gamestate in local storage then gets default state', function(){
      expect(GameService.state()).toEqual(defaultState);
    });
  });

  describe("#saveGameState", function(){
    it('saves the current state to local storage', function(){
      newState       = new GameStateFactory({level: 1, score: 10, checkpoint: 1, checkpointScore: 0});
      GameService.setGameState();
      GameService.currentState.updateScore(10);
      GameService.saveGameState(GameService.state());
      expect(GameService.state()).toEqual(newState);
    });
  });

  describe('#nextLevelState', function(){
    beforeEach(function(){
      level2state       = new GameStateFactory({level: 2, score: 10, checkpoint: 1, checkpointScore: 0});
      GameService.saveGameState(level2state);
      GameService.setGameState();
      nextLevelState = GameService.nextLevelState(GameService.state(),10);
    });

    it('return a state with the level increased by 1', function(){
      expect(nextLevelState.level).toEqual(3);
    });

    it('return a state with an increased score', function(){
      expect(nextLevelState.score).toEqual(20);
    });

    it('return a state with updated checkpoint', function(){
      expect(nextLevelState.checkpoint).toEqual(3);
    });

    it('return a state with updated checkpoint score', function(){
      expect(nextLevelState.checkpointScore).toEqual(20);
    });
  });

  describe('#checkPointState', function(){
    it('returns the state of the last checkpoint',function(){
      someState       = new GameStateFactory({level: 5, score: 50, checkpoint: 3, checkpointScore: 30});
      checkpointState = new GameStateFactory({level: 3, score: 30, checkpoint: 3, checkpointScore: 30});
      GameService.saveGameState(someState);
      expect(GameService.checkPointState(GameService.state())).toEqual(checkpointState);
    });
  });
});
