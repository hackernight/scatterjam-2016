var state_init = function(game) {
    return {
        preload: function() {
              game.load.image('colin1', 'assets/colin1.jpg');
              game.load.image('judgeResponse', 'assets/judgeResponse.jpg');
        },

        create: function() {
          game.add.sprite(0, 0, 'colin1');
        },

        update: function() {

        }
    };
};

game.state.add('init', state_init);
