angular.module('regexpert')
       .service('GameService', GameService);

GameService.$inject = ['GameStateFactory'];

function GameService(GameStateFactory){

  var defaultState = {level: 1, score: 0, checkpoint: 1, checkpointScore: 0, hintDisplayed: false};

  var game = this;

  game.getGameState = getGameState;
  game.loadGameState = loadGameState;
  game.saveGameState = saveGameState;
  game.getNextLevel = getNextLevel;
  game.getCheckPoint = getCheckPoint;

  function getGameState() {
    return game.currentState;
  }

  function loadGameState() {
    var state = JSON.parse(localStorage.getItem('gameState'));
    setGameState(state || defaultState);
  }

  function saveGameState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
    game.loadGameState();
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
      checkpointScore: state.checkpointScore,
      hintDisplayed: state.hintDisplayed
    });
  }

  function setGameState(state) {
    game.currentState = new GameStateFactory(state);
  }
}
