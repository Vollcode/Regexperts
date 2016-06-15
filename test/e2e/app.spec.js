describe("regexpert", function(){

  var levelText, expectation;

  beforeEach(function(){
    browser.get('/');
    levelText = 'Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
    expectation = 'HPF';
    levelText2 = "Cheesemaking may have originated from nomadic herdsmen who stored milk in vessels made from the sheep's and goats' stomachs. Because their stomach linings contains a mix of lactic acid, wild bacteria as milk contaminants and rennet, the milk would ferment and coagulate.";
    expectation2 = "milk";
  });


  it('highlights text based on input', function(){
    $('input#user-input').sendKeys("brHee");
    expect($('p#level-text').$('span.highlighted').getText()).toEqual('brHee');
  });

  it('a game can be won', function(){
    expect($('span#win-message').getText()).not.toMatch('WINNER');
    expect($('p#level-text').getText()).toEqual(levelText);
    expect($('p#expectation').getText()).toEqual(expectation);
    $('input#user-input').sendKeys("\\b[HPF]");
    expect($('span#win-message').getText()).toEqual('WINNER');
  });

  it('a next level button appears when the game is won', function(){
    $('input#user-input').sendKeys("\\b[HPF]");
    expect($('button#next-level').isPresent()).toBe(true);
  });

  it('loads a new level when click on the next level button', function(){
    $('input#user-input').sendKeys("\\b[HPF]");
    $('button#next-level').click();
    expect($('p#level-text').getText()).toEqual(levelText2);
    expect($('p#expectation').getText()).toEqual(expectation2);
  });
});
