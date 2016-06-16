exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*.js'],
  baseUrl: 'http://localhost:8080',
  onPrepare: function() {
    require('protractor-http-mock').config = {
      rootDirectory: process.cwd() + '/test',
      protractorConfig: 'protractor.conf.js'
    };
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};
