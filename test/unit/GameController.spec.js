describe('GameController', function(){
  beforeEach(module('regexpert'));

  var game, sce, level2, httpBackend;
  var url = 'https://regexperts-back.herokuapp.com/levels/';

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
    it('resets keyStrokeLog', function () {
      game.incrementKeyStrokes('what');
      httpBackend.expectGET(url + '2').respond(apiResponse2);
      game.nextLevel(1);
      httpBackend.flush();
      expect(game.keyStrokeLog).toEqual(0);
    });
  });

  describe('#incrementKeyStrokes', function(){
    it('increases the keyStrokeLog by 1', function(){
      game.incrementKeyStrokes('Anything');
      expect(game.keyStrokeLog).toEqual(1);
    });

    it('ignores enter key', function(){
      game.incrementKeyStrokes('Enter');
      expect(game.keyStrokeLog).toEqual(0);
    });
  });
});
