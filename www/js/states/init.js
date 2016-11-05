var gameState = {
  votedScore: null

};

var state_init = function(game) {
    return {
        preload: function() {
              game.load.image('colin1', 'assets/colin1.jpg');
              game.load.image('judgeResponseGood', 'assets/judgeResponseGood.jpg');
              game.load.image('judgeResponseBad', 'assets/judgeResponseBad.jpg');
        },

        create: function() {
          var colin = game.add.sprite(0, 0, 'colin1');
          gameState.dancer = colin;
          //game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);


        },

        update: function() {
          if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
          {
            votedScore = 1;
              endGame();
          }
          else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
          {
            votedScore = -1;
              endGame();
          }
        }
    };
};

function endGame() {
  if (votedScore>0) {
    game.add.sprite(0,0,'judgeResponseGood');
  }else {
    game.add.sprite(0,0,'judgeResponseBad');
  }
  gameState.dancer.kill();
}

game.state.add('init', state_init);
