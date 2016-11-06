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

var rightKey;
var leftKey;

var dancing = function(game) {
    return {
        preload: function() {
        },

        create: function() {
            console.log("Create called in ", game.state.current);

            drawBackground();
            drawJudges();

            //draw the score bar
            gameState.voteBar = game.add.sprite(200, 500, 'voteScoreBar');
            gameState.voteBar.scale.setTo(0.5,0.75);
            gameState.scoreArrow = game.add.sprite(200, 505, 'meterArrow');
            gameState.scoreArrow.scale.setTo(0.25,0.36);

            gameState.votedScore = (gameState.maxScore / 2);
            gameState.voteMoveWidth = gameState.voteBar.width / gameState.maxScore;
            console.log("Current scorearrowwidt: ", gameState.scoreArrow.width);
            console.log("Current voteMoveWidth: ", gameState.voteMoveWidth);
            repositionScoreBar();

            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            rightKey.onDown.add(function() {
                if (gameState.votedScore < gameState.maxScore) {
                  gameState.votedScore++;
                  repositionScoreBar();
                }

            });
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            leftKey.onDown.add(function() {
                if (gameState.votedScore > gameState.minScore) {
                  gameState.votedScore--;
                  repositionScoreBar();
                }
            });
            gameState.currentDance = createDance();
            gameState.currentDanceIndex=0;
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

function drawBackground(){
  floor = game.add.sprite(0, 0, 'floor');
  sprite = game.add.tileSprite(0, 200, 800, 300, 'floor');
}

function drawJudges(){
  tmpXJudgePadder = 30;
  tmpXJudgePosition = 0;
  judge2 = game.add.sprite(tmpXJudgePosition, 0, 'judge2');
  tmpXJudgePosition = tmpXJudgePosition + judge2.width + tmpXJudgePadder;
  draftJudge = game.add.sprite(tmpXJudgePosition, 0, 'draftJudge');
  tmpXJudgePosition = tmpXJudgePosition + draftJudge.width + tmpXJudgePadder;
  judge1 = game.add.sprite(tmpXJudgePosition, 0, 'judge1');
  tmpXJudgePosition = tmpXJudgePosition + judge1.width + tmpXJudgePadder * 2;
  russianJudge = game.add.sprite(tmpXJudgePosition, 0, 'russianJudge');

}

function repositionScoreBar(){
  console.log("Current votedScore: ", gameState.votedScore);
  gameState.scoreArrow.x = (gameState.voteMoveWidth * (gameState.votedScore)) - (gameState.scoreArrow.width / 2) + (gameState.voteBar.x);
}

function scoreDance() {
    gameState.objectiveScore = 0;
    for (var i in gameState.currentDance) {
        gameState.objectiveScore = gameState.objectiveScore + gameState.currentDance[i].score();
    }
}


game.state.add('dancing', dancing);
