angular.module('regexpert')
       .service('GameService', GameService);

GameService.$inject = ['GameStateFactory', 'LevelService'];

function GameService(GameStateFactory, LevelService){

  var defaultState = {level: 1, score: 0, checkpoint: 1, checkpointScore: 0};

  var game = this;

  game.getGameState = getGameState;
  game.showGameState = showGameState;
  game.saveGameState = saveGameState;
  // game.setLevel = setLevel;

  function getGameState() {
    var state = JSON.parse(localStorage.getItem('gameState'));
    createGameState(state || defaultState);
  }

  function saveGameState() {
    localStorage.setItem('gameState', JSON.stringify(game.currentState));
  }

  function showGameState() {
    return game.currentState;
  }

  // function setLevel() {
  //   LevelService.getLevel(game.currentState.level)
  //               .then(function(response){
  //     game.level = response;
  //   });
  // }

  function createGameState(state) {
    game.currentState = new GameStateFactory(state);
  }
  // var self = this;
  //
  // this.score = 0;
  // this.getScore = getScore;
  // this.setScore = setScore;
  // this.resetScore = resetScore;
  // this.getCheckpoint = getCheckpoint;
  // this.setCheckpoint = setCheckpoint;
  // this.resetCheckpoint = resetCheckpoint;
  //
  // function setScore(amount) {
  //   this.score += amount;
  //   saveToStorage('currentScore', this.score);
  // }
  //
  // function getScore() {
  //   return this.score;
  // }
  //
  // function getCheckpoint() {
  //   return JSON.parse(localStorage.getItem('checkpoint'));
  // }
  //
  // function setCheckpoint(levelNumber) {
  //   if (levelNumber % 3 === 0) {
  //     saveToStorage('checkpoint',{level: levelNumber, score: this.score});
  //   }
  // }
  //
  // function resetScore() {
  //   this.score = 0;
  //   saveToStorage('currentScore', 0);
  // }
  //
  // function resetCheckpoint() {
  //   saveToStorage('checkpoint',1);
  //
  // }
  //
  // function saveToStorage(item,value) {
  //   localStorage.setItem(item, JSON.stringify(value));
  // }
}
