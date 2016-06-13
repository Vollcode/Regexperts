describe("regexpert", function(){

  beforeEach(function(){
    browser.get('/');
  });

  it('a game can be won', function(){
    expect($('span#win-message').getText()).not.toMatch('WINNER');
    $('input#user-input').sendKeys("good input");
    expect($('span#win-message').getText()).toEqual('WINNER');
  });


});
