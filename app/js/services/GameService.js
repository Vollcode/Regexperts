angular.module('regexpert')
       .service('GameService', GameService);

GameService.$inject = ['GameStateFactory'];

function GameService(GameStateFactory){

  var defaultState = {level: 1, score: 0, checkpoint: 1, checkpointScore: 0};

  var game = this;

  game.getGameState = getGameState;
  game.setGameState = setGameState;
  game.saveGameState = saveGameState;
  game.getNextLevel = getNextLevel;
  game.getCheckPoint = getCheckPoint;

  function getGameState() {
    return game.currentState;
  }

  function setGameState() {
    var state = JSON.parse(localStorage.getItem('gameState'));
    createGameState(state || defaultState);
  }

  function saveGameState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
    game.setGameState();
  }

  function getNextLevel(state,score) {
    nextLevelState =  new GameStateFactory(state);
    nextLevelState.increaseLevel();
    nextLevelState.updateScore(score);
    nextLevelState.updateCheckpoint();
    return nextLevelState;
  }

  function getCheckPoint(state) {
    return new GameStateFactory({
      level: state.checkpoint,
      score: state.checkpointScore,
      checkpoint: state.checkpoint,
      checkpointScore: state.checkpointScore
    });
  }

  function createGameState(state) {
    game.currentState = new GameStateFactory(state);
  }
}
