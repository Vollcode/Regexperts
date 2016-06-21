angular.module('regexpert').service('GameService', GameService);

function GameService(){

  var self = this;

  this.score = 0;
  this.getScore = getScore;
  this.setScore = setScore;
  this.resetScore = resetScore;
  this.getCheckpoint = getCheckpoint;
  this.setCheckpoint = setCheckpoint;
  this.resetCheckpoint = resetCheckpoint;

  function setScore(amount) {
    this.score += amount;
    saveToStorage('currentScore', this.score);
  }

  function getScore() {
    return JSON.parse(localStorage.getItem('currentScore'));
  }

  function getCheckpoint() {
    return JSON.parse(localStorage.getItem('checkpoint'));
  }

  function setCheckpoint(levelNumber) {
    if (levelNumber % 3 === 0) {
      saveToStorage('checkpoint',levelNumber);
    }
  }

  function resetScore() {
    this.score = 0;
    saveToStorage('currentScore', 0);
  }

  function resetCheckpoint() {
    saveToStorage('checkpoint',1);

  }

  function saveToStorage(item,value) {
    localStorage.setItem(item, JSON.stringify(value));
  }
}
