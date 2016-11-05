var judge_Result = function(game) {
    return {
        preload: function() {
        },

        create: function() {
          console.log("Create called in ", game.state.current);
          if (gameState.votedScore>0) {
            var judgeResultGood = game.add.sprite(0,0,'judgeResponseGood');
            gameState.judgeGood = judgeResultGood;
          }else {
            var judgeResultBad =game.add.sprite(0,0,'judgeResponseBad');
            gameState.judgeBad = judgeResultBad;
          }
          //game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);
        },

        update: function() {
          if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
          {
              game.state.start("dancing");
          }
        }
    };
};

game.state.add('judge_Result', judge_Result);
