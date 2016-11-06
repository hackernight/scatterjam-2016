var startMenu = function(game) {
    return {
        preload: function() {
            game.stage.backgroundColor = "#aaaaaa";
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();

            this.centeredText("Russian Judge Redemption", 20);
            this.loadingText = this.centeredText("Loading", game.world.centerY);
            game.load.image('floor', 'assets/floorTile/draftFloor.png');
            game.load.image('judgeResponseGood', 'assets/judgeResponseGood.jpg');
            game.load.image('judgeResponseBad', 'assets/judgeResponseBad.jpg');
            game.load.image('feedbackResultGood', 'assets/vaultBoyGood.jpg');
            game.load.image('feedbackResultBad', 'assets/vaultBoyBad.jpg');
            game.load.image('meterArrow', 'assets/meter-arrow.png');
            game.load.image('voteScoreBar', 'assets/vote-score-bar.png');
            game.load.image('russianJudge', 'assets/judge/russianJudge/normalSprite.png');
            game.load.image('draftJudge', 'assets/judge/draftJudge/normalSprite.png');
            game.load.image('judge1', 'assets/judge/1Judge/normalSprite.png');
            game.load.image('judge2', 'assets/judge/2Judge/normalSprite.png');
            game.load.image('audience', 'assets/audience/audience.png');

            game.load.image('dancer-head', 'assets/dancer/mikeDancer/head.png');
            game.load.image('dancer-leftArm', 'assets/dancer/mikeDancer/leftArm.png');
            game.load.image('dancer-rightArm', 'assets/dancer/mikeDancer/rightArm.png');
            game.load.image('dancer-leftHand', 'assets/dancer/mikeDancer/leftHand.png');
            game.load.image('dancer-rightHand', 'assets/dancer/mikeDancer/rightHand.png');
            game.load.image('dancer-leftFoot', 'assets/dancer/mikeDancer/leftFoot.png');
            game.load.image('dancer-rightFoot', 'assets/dancer/mikeDancer/rightFoot.png');
            game.load.image('dancer-leftLeg', 'assets/dancer/mikeDancer/leftLeg.png');
            game.load.image('dancer-rightLeg', 'assets/dancer/mikeDancer/rightLeg.png');
            game.load.image('dancer-torso', 'assets/dancer/mikeDancer/torso.png');

            game.load.onLoadComplete.add(function() {
                // TODO kill this so you have an actual start menu
                game.state.start('dancing');

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
            text = game.add.text(game.world.centerX, y, text);
            text.anchor.setTo(0.5, 0.5);
            return text;
        },
    };
};

game.state.add('startMenu', startMenu);
