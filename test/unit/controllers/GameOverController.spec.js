describe('GameOverController', function(){
  beforeEach(module('regexpert'));

  var gameOver, state, httpBackend;

  beforeEach(inject(function($controller, $state, $httpBackend){
    gameOver = $controller('GameOverController');
    state = $state;
    httpBackend = $httpBackend;
  }));

  beforeEach(function(){
    httpBackend.whenGET(/partials.*/).respond(200, '');
  });

  describe('#restart', function(){
    it('starts a new game', function(){
      gameOver.restart();
      httpBackend.flush();
      expect(state.current.name).toEqual('game');
    });
  });
});
