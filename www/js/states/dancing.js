var gameState = {
    votedScore: null,
    objectiveScore: null,
    currentDance: null,
    currentDancer: null,
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
        preload: function() {},

        create: function() {
            console.log("Create called in ", game.state.current);

            drawBackground();
            drawJudges();
            constructDancer();

            //draw the score bar
            gameState.voteBar = game.add.sprite(200, 500, 'voteScoreBar');
            gameState.voteBar.scale.setTo(0.5, 0.75);
            gameState.scoreArrow = game.add.sprite(200, 505, 'meterArrow');
            gameState.scoreArrow.scale.setTo(0.25, 0.36);

            gameState.votedScore = (gameState.maxScore / 2);
            gameState.voteMoveWidth = gameState.voteBar.width / gameState.maxScore;

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
            gameState.currentDanceIndex = 0;
            var style = {
                font: "32px Arial",
                fill: "#ff0044",
                wordWrap: false,
                align: "center",
            };
            this.danceLabel = game.add.text(10, 460, "Dancing!", style);
            game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
              gameState.currentDanceIndex++;
                  if (gameState.currentDanceIndex > gameState.currentDance.length - 1) {
                      game.state.start("judge_Result");
                  }
                gameState.currentDancer.x = gameState.currentDancer.x + (800/5) - (gameState.currentDancer.width / 2);
            }, this);
            scoreDance();
        },

        update: function() {
            this.danceLabel.text = gameState.currentDance[gameState.currentDanceIndex].name;

            gameState.currentDance.text = gameState.currentDance.name;
        },

    };
};


function constructDancer() {
    var dancer = {};
    gameState.currentDancer = game.add.group();
    dancer.wholeBody = gameState.currentDancer;
    dancer.torso = makeBodyPart('dancer-torso', 0, 0, gameState.currentDancer);
    dancer.head = makeBodyPart('dancer-head', 0, -80, gameState.currentDancer);
    dancer.leftArm = makeBodyPart('dancer-leftArm', -30, -20, gameState.currentDancer);
    dancer.rightArm = makeBodyPart('dancer-rightArm', 30, -20, gameState.currentDancer);
    dancer.leftHand = makeBodyPart('dancer-leftHand', -30, 30, gameState.currentDancer);
    dancer.rightHand = makeBodyPart('dancer-rightHand', 30, 30, gameState.currentDancer);
    dancer.leftFoot = makeBodyPart('dancer-leftFoot', -20, 140, gameState.currentDancer);
    dancer.rightFoot = makeBodyPart('dancer-rightFoot', 20, 140, gameState.currentDancer);
    dancer.leftLeg = makeBodyPart('dancer-leftLeg', -20, 80, gameState.currentDancer);
    dancer.rightLeg = makeBodyPart('dancer-rightLeg', 20, 80, gameState.currentDancer);
    return dancer;
}

function makeBodyPart(spriteName, offsetX, offsetY, group) {
    var sprite = game.add.sprite(200 + offsetX, 200 + offsetY, spriteName);
    sprite.anchor.setTo(0.5, 0.5);
    group.add(sprite);
    return sprite;
}

function drawBackground() {
    sprite = game.add.tileSprite(0, 200, 800, 300, 'floor');
}

function drawJudges() {
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

function repositionScoreBar() {
    //console.log("Current votedScore: ", gameState.votedScore);
    gameState.scoreArrow.x = (gameState.voteMoveWidth * (gameState.votedScore)) - (gameState.scoreArrow.width / 2) + (gameState.voteBar.x);
}

function scoreDance() {
    gameState.objectiveScore = 0;
    for (var i in gameState.currentDance) {
        gameState.objectiveScore = gameState.objectiveScore + gameState.currentDance[i].score();
    }
}


game.state.add('dancing', dancing);
