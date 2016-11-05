var state_init = function(game) {
    return {
        preload: function() {
              game.load.image('colin1', 'assets/colin1.jpg');
        },

        update: function() {
          game.add.sprite(0, 0, 'colin1');
        }
    };
};

game.state.add('init', state_init);
