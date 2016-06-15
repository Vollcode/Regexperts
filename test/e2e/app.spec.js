describe("regexpert", function(){

  var levelText, target;

  beforeEach(function(){
    browser.get('/');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
    levelText2 = 'Some kind of nonsense';
    expectation = 'HPF';
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
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    expect($('span#win-message').getText()).toEqual('WINNER');
  });

  it('a next level button appears when the game is won', function(){
    $('input#user-input').sendKeys("\\b[a-z]..\\b");
    expect($('button#next-level').isPresent()).toBe(true);
  });

  it('starts on level 1', function() {
    expect($('p#level-text').getText()).toEqual(levelText);
  });

  it('loads level 2', function() {
    $('input#user-input').sendKeys("\\b[a-z]..\\b");
    $('button#next-level').click();
    expect($('section#level-number').getText()).toEqual('Level: 2');
    expect($('p#level-text').getText()).toEqual(levelText2);
  });

  it('removes the next level button on click', function() {
    $('input#user-input').sendKeys("\\b[a-z]..\\b");
    $('button#next-level').click();
    expect($('button#next-level').isPresent()).toBe(false);
  });

});
