describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, sce, level2, httpBackend;
  var url = 'https://regexperts-back.herokuapp.com/levels/'
  var apiResponse = {
        id:     1,
        text:   "Hiya there buddy",
        target: "ya"
      };
  var apiResponse2 = {
        id:     2,
        text:   "Hiya there buddy",
        target: "ya"
      };

  beforeEach(inject(function($controller, $sce, $httpBackend){
    game = $controller('GameController');
    sce = $sce;
    httpBackend = $httpBackend;
  }));

  beforeEach(function(){
    httpBackend.expectGET(url + '1').respond(apiResponse);
    game.nextLevel(0);
    httpBackend.flush();
  });

  describe('#nextLevel', function() {
    it('can change to level 2', function () {
      httpBackend.expectGET(url + '2').respond(apiResponse2);
      game.nextLevel(1);
      httpBackend.flush();
      expect(game.currentLevel.number).toEqual(2);
    });
  });

  describe('#incrementScore', function() {
    it('starts with zero points', function(){
      expect(game.currentPoints).toEqual(0);
    });

    it('increments points by 10 when level is beaten', function() {
      game.incrementScore();
      expect(game.currentPoints).toEqual(10);
    });
  });

  describe('#isMatch',function(){
    it('when input matches target returns true',function(){
      expect(game.isMatch('ya')).toEqual(true);
    });

    it('when input doesnt match target returns false',function(){
      expect(game.isMatch('bad input')).toEqual(false);
    });
  });
});
