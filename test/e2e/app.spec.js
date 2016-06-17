describe("regexpert", function(){

  var levelText, target;

  var mock = require('protractor-http-mock');

  beforeEach(function() {
    mock([{request: {
        path: 'https://regexperts-back.herokuapp.com/levels/1',
        method: 'GET'
      },
      response: {
        data:{id: 1, text: "Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.", target: "\\b[a-z]..\\b"}
      }
    }]);
  });

  beforeEach(function() {
    browser.get('/');
  });

  afterEach(function() {
    mock.teardown();
  });

  it('highlights text based on input', function(){
    $('input#user-input').sendKeys("[a-p]");
    expect($('p#level-text').$$('span.plain').first().getText()).toEqual('H');
    expect($('p#level-text').$$('span.search').first().getText()).toEqual('o');
    expect($('p#level-text').$$('span.target').first().getText()).toEqual('i');
    expect($('p#level-text').$$('span.target.search').first().getText()).toEqual('i');
  });

  it('a level can be beaten', function(){
    expect($('p#points').isDisplayed()).toBe(true);
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    $('button#next-level').click();
    expect($('p#points').getText()).toEqual('Points: 10');
    expect($('section#level-number').getText()).toEqual('Level: 2');
    expect($('button#next-level').isDisplayed()).toBe(false);
  });


  it('keystrokes used are logged', function(){
    $('input#user-input').sendKeys('abc');
    expect($('section#key-strokes').getText()).toEqual('3');
    $('input#user-input').sendKeys('def');
    expect($('section#key-strokes').getText()).toEqual('6');
  });

});
