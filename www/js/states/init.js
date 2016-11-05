var gameState = {};

var state_init = function(game) {
    return {
        preload: function() {
              game.load.image('colin1', 'assets/colin1.jpg');
              game.load.image('judgeResponse', 'assets/judgeResponse.jpg');
        },

        create: function() {
          var colin = game.add.sprite(0, 0, 'colin1');
          gameState.dancer = colin;
          game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);
        },

        update: function() {

        }
    };
};

function endGame() {
  game.add.sprite(0,0,'judgeResponse');
  gameState.dancer.kill();
}

game.state.add('init', state_init);
