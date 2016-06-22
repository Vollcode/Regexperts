angular.module('regexpert')
       .service('GameService', GameService);

GameService.$inject = ['GameStateFactory', 'LevelService'];

function GameService(GameStateFactory, LevelService){

  var defaultState = {level: 1, score: 0, checkpoint: 1, checkpointScore: 0};

  var game = this;

  game.state = state;
  game.getGameState = getGameState;
  game.saveGameState = saveGameState;
  game.nextLevelState = nextLevelState;
  game.checkPointState = checkPointState;

  function state() {
    return game.currentState;
  }

  function getGameState() {
    var state = JSON.parse(localStorage.getItem('gameState'));
    createGameState(state || defaultState);
  }

  function saveGameState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
    game.getGameState();
  }

  function nextLevelState(state,score) {
    nextLevel =  new GameStateFactory(state);
    nextLevel.increaseLevel();
    nextLevel.updateScore(score);
    nextLevel.updateCheckpoint();
    return nextLevel;
  }

  function checkPointState(state) {
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
