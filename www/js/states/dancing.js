var gameState = {
  votedScore: null,
  objectiveScore: null,
  danceMoves:[]

};

var dancing = function(game) {
    return {
        preload: function() {
              game.load.image('colin1', 'assets/colin1.jpg');
              game.load.image('judgeResponseGood', 'assets/judgeResponseGood.jpg');
              game.load.image('judgeResponseBad', 'assets/judgeResponseBad.jpg');
              game.load.image('feedbackResultGood', 'assets/vaultBoyGood.jpg');
              game.load.image('feedbackResultBad', 'assets/vaultBoyBad.jpg');
        },

        create: function() {
          console.log("Create called in ", game.state.current);
          var colin = game.add.sprite(0, 0, 'colin1');
          gameState.dancer = colin;
          gameState.votedScore = 0;

          gameState.danceMoves[0] = 1;
          gameState.danceMoves[1] = 1;
          gameState.danceMoves[2] = 1;

          scoreDance();
          //game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);
        },

        update: function() {
          if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
          {
            gameState.votedScore = 1;
            game.state.start("judge_Result");
          }
          else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
          {
            gameState.votedScore = -1;
            game.state.start("judge_Result");
          }
        },

    };
};

function scoreDance(){
    gameState.objectiveScore = 0;
    for (var i in gameState.danceMoves) {
      gameState.objectiveScore = gameState.objectiveScore + gameState.danceMoves[i];
    }
}

game.state.add('dancing', dancing);
