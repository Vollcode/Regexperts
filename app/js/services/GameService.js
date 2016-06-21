angular.module('regexpert')
       .service('GameService', GameService);

GameService.$inject = ['GameStateFactory', 'LevelService'];

function GameService(GameStateFactory, LevelService){

  var defaultState = {level: 1, score: 0, checkpoint: 1, checkpointScore: 0};

  var game = this;

  game.getGameState = getGameState;
  game.showGameState = showGameState;
  game.saveGameState = saveGameState;
  game.nextLevel = nextLevel;
  game.setLevel = setLevel;
  game.updateScore = updateScore;
  game.checkPointState = checkPointState;

  function getGameState() {
    var state = JSON.parse(localStorage.getItem('gameState'));
    createGameState(state || defaultState);
  }

  function saveGameState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
  }

  function showGameState() {
    return game.currentState;
  }

  function nextLevel(){
    game.currentState.level += 1;
    game.currentState.updateCheckpoint();
    game.saveGameState(game.currentState);
    setLevel();
  }

  function setLevel() {
    LevelService.getLevel(game.currentState.level)
                .then(function(response){
      game.level = response;
    });
  }

  function updateScore(points) {
    game.currentState.score += points;
  }

  function createGameState(state) {
    game.currentState = new GameStateFactory(state);
  }

  function checkPointState() {
    return new GameStateFactory({
      level: game.currentState.checkpoint,
      score: game.currentState.checkpointScore,
      checkpoint: game.currentState.checkpoint,
      checkpointScore: game.currentState.checkpointScore
    });
  }
}
