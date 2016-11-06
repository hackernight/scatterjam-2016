var feedback = function(game) {
    return {
        create: function() {
            //console.log("Create called in ", game.state.current);
            if (gameState.votedScore == gameState.objectiveScore ||
                gameState.votedScore == gameState.objectiveScore+1 ||
                gameState.votedScore == gameState.objectiveScore-1) {
                game.add.sprite(0, 0, 'feedbackResultGood');
            } else {
                game.add.sprite(0, 0, 'feedbackResultBad');
            }
            //game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);
        },

        update: function() {
            music.stop();
            if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                game.state.start("dancing");
            }
        }
    };
};

game.state.add('feedback', feedback);
