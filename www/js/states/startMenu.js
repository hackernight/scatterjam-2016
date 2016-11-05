var startMenu = function(game) {
    return {
        preload: function() {
            game.stage.backgroundColor = "#aaaaaa";
            this.centeredText("Russian Judge Redemption", 20);
            this.loadingText = this.centeredText("Loading", game.world.centerY);
            game.load.image('colin1', 'assets/colin1.jpg');
            game.load.image('colin2', 'assets/colin-flipped.jpg');
            game.load.image('colin3', 'assets/colin-upsidedown.jpg');
            game.load.image('judgeResponseGood', 'assets/judgeResponseGood.jpg');
            game.load.image('judgeResponseBad', 'assets/judgeResponseBad.jpg');
            game.load.image('feedbackResultGood', 'assets/vaultBoyGood.jpg');
            game.load.image('feedbackResultBad', 'assets/vaultBoyBad.jpg');
            game.load.onLoadComplete.add(function() {
                this.loadingText.destroy();
                var startButton = this.centeredText("Start Judging", game.world.centerY);
                startButton.inputEnabled = true;
                startButton.events.onInputDown.add(
                    function() {
                        game.state.start('dancing');
                    });
            }, this);
        },
        centeredText: function(text, y) {
            var text = game.add.text(game.world.centerX, y, text);
            text.anchor.setTo(0.5, 0.5);
            return text;
        },
    };
};

game.state.add('startMenu', startMenu);
