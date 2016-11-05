var gameState = {
    votedScore: null,
    objectiveScore: null,
    currentDance: null,
    currentDanceIndex: 0,
    isKeyDown: 0,
    maxScore: 20,
    minScore: 0,
    scoreArrow: null,
    voteBar: null,
    voteMoveWidth: null


};

var upKey;
var downKey;

var dancing = function(game) {
    return {
        preload: function() {
            game.load.image('colin1', 'assets/colin1.jpg');
            game.load.image('colin2', 'assets/colin-flipped.jpg');
            game.load.image('colin3', 'assets/colin-upsidedown.jpg');
            game.load.image('judgeResponseGood', 'assets/judgeResponseGood.jpg');
            game.load.image('judgeResponseBad', 'assets/judgeResponseBad.jpg');
            game.load.image('feedbackResultGood', 'assets/vaultBoyGood.jpg');
            game.load.image('feedbackResultBad', 'assets/vaultBoyBad.jpg');
            game.load.image('meterArrow', 'assets/meter-arrow.png');
            game.load.image('voteScoreBar', 'assets/vote-score-bar.png');
        },
        create: function() {
            console.log("Create called in ", game.state.current);
            var colin = game.add.sprite(0, 0, 'colin1');
            gameState.voteBar = game.add.sprite(0, 400, 'voteScoreBar');
            gameState.voteBar.scale.setTo(0.5,0.75);
            gameState.scoreArrow = game.add.sprite(0, 350, 'meterArrow');
            gameState.scoreArrow.scale.setTo(0.5,0.75);
            gameState.dancer = colin;
            gameState.votedScore = (gameState.maxScore / 2);

            gameState.voteMoveWidth = gameState.voteBar.width / gameState.maxScore;
            console.log("Current scorearrowwidt: ", gameState.scoreArrow.width);
            console.log("Current voteMoveWidth: ", gameState.voteMoveWidth);
            repositionScoreBar();

            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            upKey.onDown.add(function() {
                if (gameState.votedScore < gameState.maxScore) {
                  gameState.votedScore++;
                  repositionScoreBar();
                }

            });
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            downKey.onDown.add(function() {
                if (gameState.votedScore > gameState.minScore) {
                  gameState.votedScore--;
                  repositionScoreBar();
                }
            });
            gameState.currentDance = createDance();
            var style = {
                font: "32px Arial",
                fill: "#ff0044",
                wordWrap: true,
                wordWrapWidth: 100,
                align: "center",
                backgroundColor: "#ffff00"
            };
            this.danceLabel = game.add.text(0, 0, "Dancing!", style);
            game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
                gameState.currentDanceIndex++;
            }, this);
            scoreDance();
        },

        update: function() {
            if (gameState.currentDanceIndex >= gameState.currentDance.length - 1) {
                game.state.start("judge_Result");
            }
            this.danceLabel.text = gameState.currentDance[gameState.currentDanceIndex].name;

            gameState.currentDance.text = gameState.currentDance.name;
        },

    };
};

function repositionScoreBar(){
  console.log("Current votedScore: ", gameState.votedScore);
  gameState.scoreArrow.x = (gameState.voteMoveWidth * (gameState.votedScore)) - (gameState.scoreArrow.width / 2);
}

function scoreDance() {
    gameState.objectiveScore = 0;
    for (var i in gameState.currentDance) {
        gameState.objectiveScore = gameState.objectiveScore + gameState.currentDance[i].score();
    }
}


game.state.add('dancing', dancing);
