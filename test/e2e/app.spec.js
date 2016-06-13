describe("regexpert", function(){

  var levelText, expectation;

  beforeEach(function(){
    browser.get('/');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
    expectation = 'HPF';
  });

  it('highlights text based on input', function(){
    $('input#user-input').sendKeys("brHee");
    expect($('p#level-text').$('span.highlightedText').getText()).toEqual('brHee');
  });

  it('a game can be won', function(){
    expect($('span#win-message').getText()).not.toMatch('WINNER');
    expect($('p#level-text').getText()).toEqual(levelText);
    expect($('p#expectation').getText()).toEqual(expectation);
    $('input#user-input').sendKeys("\\b[HPF]");
    expect($('span#win-message').getText()).toEqual('WINNER');
  });


});
