describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, httpBackend, state, GameService, defaultState;
  var url = 'https://regexperts-back.herokuapp.com/levels/';

  var level1 = {
        id:     1,
        number: 1,
        text:   "Hiya there buddy",
        target: "ya",
        keystrokelimit: 50
      };

  var finalLevel = {
        id:     2,
        number: 10,
        text:   "Hiya there buddy",
        target: "ya",
        keystrokelimit: 5
      };

  beforeEach(inject(function($controller, $httpBackend, $state, _GameService_, GameStateFactory){
    game = $controller('GameController');
    GameService = _GameService_;
    httpBackend = $httpBackend;
    state = $state;
    defaultState = new GameStateFactory({level: 1, score: 0, checkpoint: 1, checkpointScore: 0});
  }));

  beforeEach(function(){
    httpBackend.whenGET(/partials.*/).respond(200, '');
    httpBackend.expectGET(url + '1').respond(level1);
    httpBackend.flush();
  });

  afterEach(function(){
    localStorage.removeItem('gameState');
  });

  describe('#activate', function(){
    it('starts a new game on initialisation', function(){
      expect(game.level.number).toEqual(1);
    });
  });

  describe('#evaluate', function(){
    it('changes to gameover screen if key stroke limit reaches 0', function(){
      for(var i = 0; i < 50; i++){
        game.level.reduceKeyLimit();
      }
      game.evaluate();
      httpBackend.flush();
      expect(state.current.name).toEqual('gameOver');
    });
  });

  describe('after first level', function(){
    beforeEach(function(){
      httpBackend.expectGET(url + '2').respond(finalLevel);
      game.completeLevel();
      httpBackend.flush();
    });

    describe('#completeLevel', function() {
      it('gets the next level', function() {
        expect(game.level.number).toEqual(10);
      });

      it('updates the score', function() {
        expect(GameService.state().score).toEqual(50);
      });

      it('goes to win screen after level 10', function(){
        game.completeLevel();
        httpBackend.flush();
        expect(state.current.name).toEqual('winner');
      });
    });

    describe('#restart', function(){
      it('sets the game to default state', function(){
        httpBackend.expectGET(url + '1').respond(level1);
        game.restart();
        httpBackend.flush();
        expect(GameService.state()).toEqual(defaultState);
      });
    });
  });
});
