describe("regexpert", function(){

  var levelText, expectation;

  beforeEach(function(){
    browser.get('/');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
    expectation = 'HPF';
  });

<<<<<<< HEAD
  it('a valid match produces winner message', function(){
    expect($('section#level-number').getText()).toEqual("Level: 1");
=======
  it('highlights text based on input', function(){
    $('input#user-input').sendKeys("brHee");
    expect($('p#level-text').$('span.highlightedText').getText()).toEqual('brHee');
  });

  it('a game can be won', function(){
    expect($('span#win-message').getText()).not.toMatch('WINNER');
>>>>>>> 0dae8fb13c7c6af7d2d15cc4c43555da644abb54
    expect($('p#level-text').getText()).toEqual(levelText);
    expect($('p#expectation').getText()).toEqual(expectation);
    $('input#user-input').sendKeys("\\b[HPF]");
    expect($('span#win-message').getText()).toEqual('WINNER');
  });

  it('a valid match loads up a new level',function(){
    $('input#user-input').sendKeys("\\b[HPF]");
    expect($('section#level-number').getText()).toEqual("Level: 2");
  });


});
