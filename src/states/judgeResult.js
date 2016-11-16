let judgeToDisplay;

class JudgeResult extends Phaser.State {
    init(gameState, music) {
        this.gameState = gameState;
        this.music = music;

    }
    create() {
        //console.log("Create called in ", this.game.state.current);

        judgeToDisplay = 1;
        tmpXJudgePosition = 0;
        this.game.time.events.loop(Phaser.Timer.SECOND * 1, () => {
            this.displayJudge();
        });
    }

    displayJudge() {
        let style = {
            font: "32px Arial",
            //fill: "#ff0044",
            wordWrap: false,
            align: "center",
            backgroundColor: "white"
        };

        if (judgeToDisplay == 1) {
            this.gameState.judge2.destroy();
            this.gameState.judge2 = this.game.add.sprite(tmpXJudgePosition, 0, 'judge2Score');
            tmpXJudgePosition = tmpXJudgePosition + this.gameState.judge2.width + tmpXJudgePadder;
            let text = this.game.add.text(this.gameState.judge2.centerX - 5, 30, this.addRandomness(this.gameState.objectiveScore / 2, 4), style);
            text.anchor.setTo(0.5, 0.5);
        }
        if (judgeToDisplay == 2) {
            this.gameState.judge3.destroy();
            this.gameState.judge3 = this.game.add.sprite(tmpXJudgePosition, 0, 'judge3Score');
            tmpXJudgePosition = tmpXJudgePosition + this.gameState.judge3.width + tmpXJudgePadder;
            let text2 = this.game.add.text(this.gameState.judge3.centerX - 5, 30, this.addRandomness(this.gameState.objectiveScore / 2, 5), style);
            text2.anchor.setTo(0.5, 0.5);
        }
        if (judgeToDisplay == 3) {
            this.gameState.judge1.destroy();
            this.gameState.judge1 = this.game.add.sprite(tmpXJudgePosition, 0, 'judge1Score');
            tmpXJudgePosition = tmpXJudgePosition + this.gameState.judge1.width + tmpXJudgePadder * 2;
            let text3 = this.game.add.text(this.gameState.judge1.centerX - 5, 30, this.addRandomness(this.gameState.objectiveScore / 2, 3), style);
            text3.anchor.setTo(0.5, 0.5);
        }
        if (judgeToDisplay == 4) {
            this.gameState.russianJudge.destroy();
            this.gameState.russianJudge = this.game.add.sprite(tmpXJudgePosition, 0, 'russianJudgeScore');
            let text4 = this.game.add.text(this.gameState.russianJudge.centerX - 5, 30, this.gameState.votedScore / 2, style);
            text4.anchor.setTo(0.5, 0.5);
            let stamp = this.game.add.sprite(tmpXJudgePosition + (this.gameState.russianJudge.width / 2) - 40, 190, 'stamp');
        }
        if (judgeToDisplay == 5) {
            this.game.time.events.add(Phaser.Timer.SECOND * 2, this.giveFeedback, this);
        }
        judgeToDisplay++;

    }

    addRandomness(baseScore, maxRandomness) {

        let randomizedNumber = (this.game.rnd.integerInRange(0, maxRandomness) / 10);

        let positive = this.game.rnd.integerInRange(0, 1);
        if (positive === 0) {
            randomizedNumber = -1 * randomizedNumber;
        }
        randomizedNumber = randomizedNumber + baseScore;
        if (randomizedNumber < 0) {
            randomizedNumber = 0;
        }
        if (randomizedNumber > 10) {
            randomizedNumber = 10;
        }

        return randomizedNumber;
    }

    giveFeedback() {
        this.game.state.start("feedback", true, false, this.gameState);
    }

    shutdown() {
        this.music.stop();
    }
}

let tmpXJudgePadder = 30;
let tmpXJudgePosition = 0;



export default JudgeResult;
