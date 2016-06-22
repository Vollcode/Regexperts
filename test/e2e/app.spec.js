describe("regexpert", function(){

  var levelText, target;

  var mock = require('protractor-http-mock');

  beforeEach(function() {
    mock([
      {request: {
        path: 'https://regexperts-back.herokuapp.com/levels/1',
        method: 'GET'
        },
        response: {
          data:{id: 1, number: 1, mission: "This is your mission", text: "Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.", target: "\\b[a-z]..\\b", keystrokelimit: 50, hint: 'Check your inner developer for answers'}
        }
      },
        {request: {
          path: 'https://regexperts-back.herokuapp.com/levels/2',
          method: 'GET'
        },
        response: {
          data:{id: 2, number: 2, mission: "This is your mission", text: "Horse brHeeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.", target: "\\b[a-z]..\\b", keystrokelimit: 15}
        }
      },
        {request: {
          path: 'https://regexperts-back.herokuapp.com/levels/3',
          method: 'GET'
        },
        response: {
          data:{id: 3, number: 10, mission: "Final mission", text: "Beat the big bad dad boss.", target: "[bd]ad", keystrokelimit: 7}
        }
      }
    ]);
  });

  beforeEach(function() {
    browser.get('/');
  });

  afterEach(function() {
    mock.teardown();
    browser.executeScript("window.localStorage.clear();");
  });

  it('highlights text based on input', function(){
    $('input#user-input').sendKeys("[a-p]");
    expect($('p#level-text').$$('span.null').first().getText()).toEqual('H');
    expect($('p#level-text').$$('span.search').first().getText()).toEqual('o');
    expect($('p#level-text').$$('span.target').first().getText()).toEqual('i');
    expect($('p#level-text').$$('span.target.search').first().getText()).toEqual('i');
  });

  it('keystrokes remaining are logged', function(){
    $('input#user-input').sendKeys('abc');
    expect($('a#keystrokes-remaining').getText()).toMatch('47');
    $('input#user-input').sendKeys('def');
    expect($('a#keystrokes-remaining').getText()).toMatch('44');
  });

  it('using a hint will decrease the score', function(){
    expect($('button#hint').isDisplayed()).toBe(true);
    $('button#hint').click();
    expect($('span#hint-message').isDisplayed()).toBe(true);
    expect($('a#points').getText()).toMatch('Points: -10');
  });

  it('a level can be beaten', function(){
    expect($('a#points').isDisplayed()).toBe(true);
    expect($('p#mission-text').getText()).toMatch('This is your mission');
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    $('button#next-level').click();
    expect($('a#points').getText()).toMatch('39');
    expect($('a#level-number').getText()).toMatch('2');
    expect($('button#next-level').isDisplayed()).toBe(false);
  });

  it('when keylimit reaches 0 go to game over screen with restart button', function(){
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    $('button#next-level').click();
    $('input#user-input').sendKeys('bcdefghijklmnop');
    expect(browser.getLocationAbsUrl()).toEqual('/gameOver');
    $('button#restart').click();
    expect(browser.getLocationAbsUrl()).toEqual('/');
  });

  it('after finshing level 10 player take to win screen', function() {
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    $('button#next-level').click();
    $('input#user-input').sendKeys('\\b[a-z]..\\b');
    $('button#next-level').click();
    $('input#user-input').sendKeys('[bd]ad');
    $('button#next-level').click();
    expect(browser.getLocationAbsUrl()).toEqual('/winner');
  });

});
