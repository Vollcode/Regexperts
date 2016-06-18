describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, sce, level2, httpBackend;
  var url = 'https://regexperts-back.herokuapp.com/levels/';


  var apiResponse = {
        id:     1,
        number: 1,
        text:   "Hiya there buddy",
        target: "ya",
        keystrokelimit: 50
      };
  var apiResponse2 = {
        id:     2,
        number: 2,
        text:   "Hiya there buddy",
        target: "ya",
        keystrokelimit: 45
      };

  beforeEach(inject(function($controller, $sce, $httpBackend){
    game = $controller('GameController');
    sce = $sce;
    httpBackend = $httpBackend;
  }));


  beforeEach(function(){
    httpBackend.whenGET(/partials.*/).respond(200, '');
    httpBackend.expectGET(url + '1').respond(apiResponse);
    httpBackend.flush();
  });

  describe('#activate', function(){
    it('starts a new game on initialisation', function(){
      expect(game.currentLevel.number).toEqual(1);
    });
  });

  describe('', function(){
    it('', function(){
      for(var i = 0; i < 50; i++){
        game.currentLevel.reduceKeyLimit();
      }
      expect(game.currentLevel.isLost()).toEqual(true);
    });
  });

  describe('#nextLevel', function() {
    it('can change to level 2', function () {
      httpBackend.expectGET(url + '2').respond(apiResponse2);
      game.nextLevel(1);
      httpBackend.flush();
      expect(game.currentLevel.number).toEqual(2);
    });
  });
});
