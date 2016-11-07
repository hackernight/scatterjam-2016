var feedback = function(game) {
    return {
        create: function() {
            //console.log("Create called in ", game.state.current);
            if (gameState.votedScore == gameState.objectiveScore ||
                gameState.votedScore == gameState.objectiveScore+1 ||
                gameState.votedScore == gameState.objectiveScore-1) {
                music.stop();
                music = game.add.audio('cheer');
                music.play();

                audience = game.add.sprite(0, 0, "audience");
                audience.scale.setTo(3,3);

                fbGood = game.add.sprite(0, 0, 'feedbackResultGood');
                fbGood.scale.setTo(3,3);
                fbGood.x = 200;
            } else {
                music.stop();
                music = game.add.audio('boo');
                music.play();

                audience = game.add.sprite(0, 0, "audience");
                audience.scale.setTo(3,3);

                fbBad = game.add.sprite(0, 0, 'feedbackResultBad');
                fbBad.scale.setTo(3,3);
                fbBad.x = 200;
            }
            //game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);
            var startButton = this.centeredText("Next Round?", 500);

            startButton.inputEnabled = true;
            startButton.events.onInputDown.add(
                function() {
                  music.stop();
                  game.state.start("dancing");
                });

        },        centeredText: function(ctext, y) {
                    ctext = game.add.text(game.world.centerX-25, y, ctext);
                    ctext.anchor.setTo(0.5, 0.5);
                    return ctext;
                },

        update: function() {

            if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
                music.stop();
                game.state.start("dancing");
            }
        }
    };
};

game.state.add('feedback', feedback);
