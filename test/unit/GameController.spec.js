describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, httpBackend, state;
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

  beforeEach(inject(function($controller, $httpBackend, $state){
    game = $controller('GameController');
    httpBackend = $httpBackend;
    state = $state;
  }));


  beforeEach(function(){
    httpBackend.whenGET(/partials.*/).respond(200, '');
    httpBackend.expectGET(url + '1').respond(level1);
    httpBackend.flush();
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

  describe('#completeLevel', function() {
    beforeEach(function(){
      httpBackend.expectGET(url + '2').respond(level2);
      game.completeLevel();
      httpBackend.flush();
    });

    it('gets the next level', function() {
      expect(game.level.number).toEqual(2);
    });

    it('updates the score', function() {
      expect(game.GameService.score).toEqual(50);
    });
  });
});
