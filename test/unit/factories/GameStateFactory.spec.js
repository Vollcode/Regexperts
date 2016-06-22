describe('GameStateFactory', function(){
  beforeEach(module('regexpert'));

  var gameState;

  beforeEach(inject(function(GameStateFactory){
    gameState = new GameStateFactory({level: 1, score: 0, checkpoint: 1, checkpointScore: 0, hintDisplayed: false});
  }));

  it('contains current level number',function(){
    expect(gameState.level).toEqual(1);
  });

  it('contains current score',function(){
    expect(gameState.score).toEqual(0);

  });

  it('contains last checkpoint',function(){
    expect(gameState.checkpoint).toEqual(1);

  });

  it('contains score at last checkpoint',function(){
    expect(gameState.checkpointScore).toEqual(0);
  });

  describe('#updateScore', function(){
    it('adds to current score',function(){
      gameState.updateScore(10);
      gameState.updateScore(5);
      expect(gameState.score).toEqual(15);
    });
  });

  describe('#increaseLevel', function(){
    it('to desired level',function(){
      gameState.increaseLevel();
      expect(gameState.level).toEqual(2);
    });
  });

  describe('#updateCheckpoint', function(){
    describe('when level is a multiple of three', function(){
      beforeEach(function(){
        gameState.updateScore(10);
        gameState.increaseLevel();
        gameState.increaseLevel();
        gameState.updateCheckpoint();
      });

      it('updates checkpoint level', function(){
        expect(gameState.checkpoint).toEqual(3);
      });

      it('updates checkpoint score', function(){
        expect(gameState.checkpointScore).toEqual(10);
      });
    });
    describe('when level is not a multiple of three', function(){
      beforeEach(function(){
        gameState.updateScore(10);
        gameState.increaseLevel();
        gameState.updateCheckpoint();
      });

      it(' does not update checkpoint level', function(){
        expect(gameState.checkpoint).toEqual(1);
      });

      it('does not update checkpoint score', function(){
        expect(gameState.checkpointScore).toEqual(0);
      });
    });
  });
});
