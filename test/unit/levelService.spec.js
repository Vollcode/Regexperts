describe('LevelService', function(){

  beforeEach(module('regexpert'));

  var LevelService, LevelFactory, httpBackend, url, response;

  url = '/levels/levels.json';
  response = {
    levels:[
      {
        number:   1,
        text:     "Hiya there buddy",
        target:   "ya"
      },
      {
        number:   2,
        text:     "Sorry there buddy can't do that",
        target:   "buddy"
      }
    ]
  };

  beforeEach(inject(function(_LevelService_, _LevelFactory_, $httpBackend){
    LevelService = _LevelService_;
    LevelFactory = _LevelFactory_;
    httpBackend = $httpBackend;
  }));

  describe('#getLevel', function(){
    it('returns the content of the desired level', function(){
      httpBackend.expectGET(url).respond(response);
      var level1 = new LevelFactory({number: 1, text:"Hiya there buddy", target: "ya"});

      LevelService.getLevel(1).then(function(response){
        expect(response).toEqual(level1);
      });
      httpBackend.flush();
    });

    it('does not return information from other levels', function(){
      httpBackend.expectGET(url).respond(response);
      LevelService.getLevel(1).then(function(response){
        expect(response).not.toEqual({
          number:   2,
          text:     "Sorry there buddy can't do that",
          target:   "buddy"
        });
      });
      httpBackend.flush();
    });
  });

});
