class Feedback extends Phaser.State {
    init(gameState) {
        this.gameState = gameState;
    }
    create() {
        if (!!!this.gameState.failRounds) {
            this.gameState.failRounds = 0;
        }
        if (!!!this.gameState.successRounds) {
            this.gameState.successRounds = 0;
        }

        //console.log("Create called in ", this.game.state.current);
        if (this.gameState.votedScore == this.gameState.objectiveScore ||
            this.gameState.votedScore == this.gameState.objectiveScore + 1 ||
            this.gameState.votedScore == this.gameState.objectiveScore - 1) {
            this.gameState.successRounds++;
            // My suspicion is that you don't need this. I could be wrong. State should clean that up
            // music.stop();
            this.music = this.game.add.audio('cheer');
            this.music.play();

            let audience = this.game.add.sprite(0, 0, "audience");
            audience.scale.setTo(3, 3);

            let fbGood = this.game.add.sprite(0, 0, 'feedbackResultGood');
            fbGood.scale.setTo(3, 3);
            fbGood.x = 200;
        } else {
            this.gameState.failRounds++;
            // music.stop(); // See above long comment
            this.music = this.game.add.audio('boo');
            this.music.play();

            let audience = this.game.add.sprite(0, 0, "audience");
            audience.scale.setTo(3, 3);

            let fbBad = this.game.add.sprite(0, 0, 'feedbackResultBad');
            fbBad.scale.setTo(3, 3);
            fbBad.x = 200;
        }
        var style = {
            font: "32px Arial",
            fill: "#ffffff",
            wordWrap: false,
            align: "center",
            strokeThickness: 5
        };
        this.game.add.text(300, 30, "Success:", style);
        this.game.add.text(500, 30, this.gameState.successRounds, style);
        this.game.add.text(300, 70, "Failure:", style);
        this.game.add.text(500, 70, this.gameState.failRounds, style);

        //this.game.time.events.add(Phaser.Timer.SECOND * 4, endGame, this);
        var startButton = this.centeredText("Next Round?", 500);

        startButton.inputEnabled = true;
        startButton.events.onInputDown.add(
            () => {
                this.music.stop();
                this.game.state.start("dancing");
            });

    }

    centeredText(value, y) {
        let ctext = this.game.add.text(this.game.world.centerX - 25, y, value);
        ctext.anchor.setTo(0.5, 0.5);
        return ctext;
    }

    update() {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.music.stop();
            this.game.state.start("dancing");
        }
    }
}
export default Feedback;
