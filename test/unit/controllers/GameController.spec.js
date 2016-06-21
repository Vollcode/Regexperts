describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, httpBackend, state, GameService;
  var url = 'https://regexperts-back.herokuapp.com/levels/';

  var level1 = {
        id:     1,
        number: 1,
        text:   "Hiya there buddy",
        target: "ya",
        keystrokelimit: 50
      };

  var level2 = {
        id:     2,
        number: 2,
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

  beforeEach(inject(function($controller, $httpBackend, $state, _GameService_){
    game = $controller('GameController');
    GameService = _GameService_;
    httpBackend = $httpBackend;
    state = $state;
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
      expect(GameService.level.number).toEqual(1);
    });
  });

  describe('#evaluate', function(){
    it('changes to gameover screen if key stroke limit reaches 0', function(){
      for(var i = 0; i < 50; i++){
        GameService.level.reduceKeyLimit();
      }
      game.evaluate();
      httpBackend.flush();
      expect(state.current.name).toEqual('gameOver');
    });
  });

  describe('#completeLevel', function() {
    beforeEach(function(){
      httpBackend.expectGET(url + '2').respond(finalLevel);
      game.completeLevel();
      httpBackend.flush();
    });

    it('gets the next level', function() {
      expect(GameService.level.number).toEqual(10);
    });

    it('updates the score', function() {
      expect(GameService.showGameState().score).toEqual(50);
    });

    it('goes to win screen after level 10', function(){
      game.completeLevel();
      httpBackend.flush();
      expect(state.current.name).toEqual('winner');
    });
  });
});
