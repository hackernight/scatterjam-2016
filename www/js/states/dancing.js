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
    voteMoveWidth: null,
    dancer: null,
    judge2: null,
    judge3: null,
    judge1: null,
    russianJudge: null,
    emote1: null
};

var rightKey;
var leftKey;
var music;

var dancing = function(game) {
    return {
        preload: function() {

            game.stage.backgroundColor = "#aaaaaa";

        },

        create: function() {
            music = game.add.audio('polka');
            music.play();

            drawBackground();
            drawJudges();
            gameState.dancer = constructDancer();

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
            gameState.emote1 = game.add.text(gameState.judge2.centerX - 5, 30, "", style);
            gameState.emote1.anchor.setTo(0.5, 0.5);
            game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
                gameState.currentDanceIndex++;
                if (gameState.currentDanceIndex > gameState.currentDance.length - 1) {
                    gameState.emote1.x = 999;
                    game.state.start("judge_Result", 0);
                }
                //gameState.currentDancer.x = gameState.currentDancer.x + (800/5) - (gameState.currentDancer.width / 2);
                gameState.emote1.text = "";
                game.add.tween(gameState.currentDancer).to({
                    x: ('+160')
                }, 1000, pickRandomTween(), true);
                emote();

            }, this);
            scoreDance();
        },

        update: function() {
            this.danceLabel.text = gameState.currentDance[gameState.currentDanceIndex].name;

            gameState.currentDance.text = gameState.currentDance.name;
            pose();
        },

    };
};

function emote() {
    if (gameState.currentDanceIndex <= gameState.currentDance.length - 1) {
        if (gameState.currentDance[gameState.currentDanceIndex].score() > 0) {
            gameState.emote1.text = "Good";
        }
        if (gameState.currentDance[gameState.currentDanceIndex].score() === 0) {
            gameState.emote1.text = "Hmm";
        }
        if (gameState.currentDance[gameState.currentDanceIndex].score() < 0) {
            gameState.emote1.text = "Uh-oh";
        }
    }
}

function pickRandomTween() {
    var easingFunctions = [Phaser.Easing.Exponential.Out, Phaser.Easing.Exponential.In, Phaser.Easing.Cubic.Out, Phaser.Easing.Cubic.In, Phaser.Easing.Circular.Out, Phaser.Easing.Quartic.Out];
    var i = (Math.random() * 100) % easingFunctions.length;
    return easingFunctions[i];
}

function pose() {
    var currentDance = gameState.currentDance[gameState.currentDanceIndex];
    if (!gameState.dancer || !currentDance) {
        return;
    }
    var tweenSpeed = 0.1;
    gameState.dancer.leftArm.angle += (currentDance.pose.leftArm - gameState.dancer.leftArm.angle) * tweenSpeed;
    gameState.dancer.leftHand.angle = 180 + gameState.dancer.leftArm.angle;
    gameState.dancer.rightArm.angle += (currentDance.pose.rightArm - gameState.dancer.rightArm.angle) * tweenSpeed;
    gameState.dancer.rightHand.angle = 180 + gameState.dancer.rightArm.angle;
    gameState.dancer.leftLeg.angle += (currentDance.pose.leftLeg - gameState.dancer.leftLeg.angle) * tweenSpeed;
    gameState.dancer.leftFoot.angle = gameState.dancer.leftLeg.angle;
    gameState.dancer.rightLeg.angle += (currentDance.pose.rightLeg - gameState.dancer.rightLeg.angle) * tweenSpeed;;
    gameState.dancer.rightFoot.angle = gameState.dancer.rightLeg.angle;

}

function constructDancer() {
    var dancer = {};
    gameState.currentDancer = game.add.group();
    dancer.wholeBody = gameState.currentDancer;
    dancer.torso = makeBodyPart('dancer-torso', 0, 0, gameState.currentDancer);
    dancer.head = makeBodyPart('dancer-head', 0, -80, gameState.currentDancer);
    dancer.leftArm = makeBodyPart('dancer-leftArm', -25, -50, gameState.currentDancer);
    dancer.leftArm.anchor.setTo(0.5, 0);
    dancer.rightArm = makeBodyPart('dancer-rightArm', 25, -50, gameState.currentDancer);
    dancer.rightArm.anchor.setTo(0.5, 0);

    dancer.leftHand = makeBodyPart('dancer-leftHand', -30, -45, gameState.currentDancer);
    dancer.leftHand.anchor.setTo(0.5, 0.5);
    dancer.leftHand.angle = 180;
    dancer.leftHand.pivot.y = dancer.leftArm.height;
    dancer.rightHand = makeBodyPart('dancer-rightHand', 30, -45, gameState.currentDancer);
    dancer.rightHand.anchor.setTo(0.5, 0.5);
    dancer.rightHand.angle = 180;
    dancer.rightHand.pivot.y = dancer.rightArm.height;

    dancer.leftLeg = makeBodyPart('dancer-leftLeg', -20, 35, gameState.currentDancer);
    dancer.leftLeg.anchor.setTo(0.5, 0);
    dancer.rightLeg = makeBodyPart('dancer-rightLeg', 20, 35, gameState.currentDancer);
    dancer.rightLeg.anchor.setTo(0.5, 0);

    dancer.leftFoot = makeBodyPart('dancer-leftFoot', -25, 135 - dancer.leftLeg.height, gameState.currentDancer);
    dancer.leftFoot.anchor.setTo(0.5, 0.5);
    dancer.leftFoot.pivot.y = -dancer.leftLeg.height;
    dancer.rightFoot = makeBodyPart('dancer-rightFoot', 25, 135 - dancer.leftLeg.height, gameState.currentDancer);
    dancer.rightFoot.anchor.setTo(0.5, 0.5);
    dancer.rightFoot.pivot.y = -dancer.rightLeg.height;

    return dancer;
}

function makeBodyPart(spriteName, offsetX, offsetY, group) {
    var sprite = game.add.sprite(100 + offsetX, 200 + offsetY, spriteName);
    sprite.anchor.setTo(0.5, 0.5);
    group.add(sprite);
    return sprite;
}

function drawBackground() {
    audience = game.add.sprite(0, 0, "audience");
    sprite = game.add.tileSprite(0, 200, 800, 300, 'floor');
}

function drawJudges() {
    tmpXJudgePadder = 30;
    tmpXJudgePosition = 0;
    gameState.judge2 = game.add.sprite(tmpXJudgePosition, 0, 'judge2');
    tmpXJudgePosition = tmpXJudgePosition + gameState.judge2.width + tmpXJudgePadder;
    gameState.judge3 = game.add.sprite(tmpXJudgePosition, 0, 'judge3');
    tmpXJudgePosition = tmpXJudgePosition + gameState.judge3.width + tmpXJudgePadder;
    gameState.judge1 = game.add.sprite(tmpXJudgePosition, 0, 'judge1');
    tmpXJudgePosition = tmpXJudgePosition + gameState.judge1.width + tmpXJudgePadder * 2;
    gameState.russianJudge = game.add.sprite(tmpXJudgePosition, 0, 'russianJudge');

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
