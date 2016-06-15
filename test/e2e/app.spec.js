describe("regexpert", function(){

  var levelText, expectation;

  beforeEach(function(){
    browser.get('/');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
  });

  it('highlights text based on input', function(){
    $('input#user-input').sendKeys("[a-p]");
    expect($('p#level-text').$$('span.plain').first().getText()).toEqual('H');
    expect($('p#level-text').$$('span.search').first().getText()).toEqual('o');
    expect($('p#level-text').$$('span.target').first().getText()).toEqual('i');
    expect($('p#level-text').$$('span.target.search').first().getText()).toEqual('i');
  });

  it('a game can be won', function(){
    expect($('span#win-message').getText()).not.toMatch('WINNER');
    expect($('p#level-text').getText()).toEqual(levelText);
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    expect($('span#win-message').getText()).toEqual('WINNER');
  });
});
