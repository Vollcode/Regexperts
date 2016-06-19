describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, httpBackend;
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
        keystrokelimit: 15
      };

  beforeEach(inject(function($controller, $sce, $httpBackend){
    game = $controller('GameController');
    sce = $sce;
    httpBackend = $httpBackend;
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

    beforeEach(function(){
      game.nextLevel();
      httpBackend.expectGET(url + '2').respond(level2);
      httpBackend.flush();
    });

    it('restarts the game if the keystroke limit reaches 0', function(){
      for(var i = 0; i < 15; i++){
        game.level.reduceKeyLimit();
      }
      httpBackend.expectGET(url + '1').respond(level1);
      game.evaluate();
      httpBackend.flush();
      expect(game.level.number).toEqual(1);
    });
  });

  describe('#nextLevel', function() {
    it('gets the next level', function () {
      httpBackend.expectGET(url + '2').respond(level2);
      game.nextLevel();
      httpBackend.flush();
      expect(game.level.number).toEqual(2);
    });
  });
});
