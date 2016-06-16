describe('LevelService', function(){

  beforeEach(module('regexpert'));

  var LevelService, LevelFactory, httpBackend, url, response;

  url = 'https://regexperts-back.herokuapp.com/levels/1'
  response = {
        id:     1,
        text:   "Hiya there buddy",
        target: "ya"
      };

  beforeEach(inject(function(_LevelService_, _LevelFactory_, $httpBackend){
    LevelService = _LevelService_;
    LevelFactory = _LevelFactory_;
    httpBackend = $httpBackend;
  }));

  describe('#getLevel', function(){
    it('returns the content of the desired level', function(){
      httpBackend.expectGET(url).respond(response);
      var level1 = new LevelFactory({id: 1, text:"Hiya there buddy", target: "ya"});

      LevelService.getLevel(1).then(function(response){
        expect(response).toEqual(level1);
      });
      httpBackend.flush();
    });
  });
});
