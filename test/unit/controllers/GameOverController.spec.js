describe('GameOverController', function(){
  beforeEach(module('regexpert'));

  var gameOver, state, httpBackend, GameService, GameStateFactory;

  beforeEach(inject(function($controller, $state, $httpBackend, _GameService_, GameStateFactory){
    gameOver = $controller('GameOverController');
    state = $state;
    httpBackend = $httpBackend;
    GameService = _GameService_;
    defaultState = new GameStateFactory({level: 1, score: 0, checkpoint: 1, checkpointScore: 0, hintDisplayed: false});
    someState = new GameStateFactory({level: 5, score: 50, checkpoint: 5, checkpointScore: 50, hintDisplayed: false});
  }));

  beforeEach(function(){
    httpBackend.whenGET(/partials.*/).respond(200, '');
  });

  afterEach(function(){
    localStorage.removeItem('gameState');
  });

  describe('#getCheckpoint', function(){
    it('returns the last checkpoint object', function(){
      expect(gameOver.getCheckpoint()).toEqual(defaultState);
    });
  });

  describe('#restart', function(){
    it('sets gamestate to state that its passed', function(){
      gameOver.restart(someState);
      httpBackend.flush();
      GameService.loadGameState();
      expect(GameService.getGameState()).toEqual(someState);
    });

    describe('passed no state', function(){
      beforeEach(function(){
        gameOver.restart(null);
        httpBackend.flush();
      });

      it('starts a new game', function(){
        expect(state.current.name).toEqual('game');
      });

      it('sets gamestate to default if passed null', function(){
        GameService.loadGameState();
        expect(GameService.getGameState()).toEqual(defaultState);
      });
    });
  });
});
