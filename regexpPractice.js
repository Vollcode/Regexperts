var str = 'Horse bHreeding is reproduction in horses, and particularly the human-directed process of selective breeding of animals, particularly purebred horses of a given breed. Planned matings can be used to produce specifically desired characteristics in domesticated horses. Furthermore, modern breeding management and technologies can increase the rate of conception, a healthy pregnancy, and successful foaling.';
var regexp = new RegExp("\\b[HPF]", 'g');
console.log(str.match(regexp).join(''));
