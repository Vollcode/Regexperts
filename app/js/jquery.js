setInterval(moveSnowden, 100);
var keys = {};
var switcher;

$(document).keydown(function(e) {
    keys[e.keyCode] = true;
});

$(document).keyup(function(e) {
    delete keys[e.keyCode];
});


function moveSnowden() {
  for (var key in keys) {
    if(keys[key] && switcher){
      $("#left-hand").animate({top: "-=50"}, 0);
      $("#right-hand").animate({top: "+=50"}, 0);
      switcher = false;
    } else {
      $("#left-hand").animate({top: "+=50"}, 0);
      $("#right-hand").animate({top: "-=50"}, 0);
      switcher = true;
    }
  }
}
