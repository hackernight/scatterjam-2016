var gameState = {
    votedScore: null,
    emitter: null,
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
    emote1: null,
    emote2: null,
    emote3: null,
    currentEmotedDanceIndex: null,
    failRounds: null,
    successRounds: null
};

var rightKey;
var leftKey;
var music;

class Dancing extends Phaser.State {
    preload() {

        game.stage.backgroundColor = "#aaaaaa";

    }

    create() {
        music = game.add.audio(getMusic());
        music.play();

        var style = {
            font: "32px Arial",
            fill: "#ffffff",
            wordWrap: false,
            align: "center",
            strokeThickness: 5
        };

        drawBackground();
        drawJudges();

        gameState.emitter = game.add.emitter(game.world.centerX, 200, 250);
        gameState.emitter.makeParticles('particle-star');
        gameState.emitter.minParticleSpeed.setTo(-300, -300);
        gameState.emitter.maxParticleSpeed.setTo(300, 300);
        gameState.emitter.setAlpha(1, 0, 4000, Phaser.Easing.Exponential.Out);

        gameState.dancer = constructDancer();

        //draw the score bar
        gameState.voteBar = game.add.sprite(200, 500, 'voteScoreBar');
        gameState.voteBar.scale.setTo(0.5, 0.75);
        gameState.scoreArrow = game.add.sprite(200, 505, 'meterArrow');
        gameState.scoreArrow.scale.setTo(0.25, 0.36);
        game.add.text(160, 520, "0", style);
        game.add.text(610, 520, "10", style);

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
        gameState.currentEmotedDanceIndex = -1;

        this.danceLabel = game.add.text(game.world.centerX, 460, "Dancing!", style);
        this.danceLabel.anchor.setTo(0.5, 0);
        game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
            killEmotes();
            gameState.currentDanceIndex++;
            if (gameState.currentDanceIndex > gameState.currentDance.length - 1) {
                killEmotes();
                game.state.start("judgeResult", 0);
            }
            //gameState.currentDancer.x = gameState.currentDancer.x + (800/5) - (gameState.currentDancer.width / 2);
            //gameState.emote1.text = "";
            var moveTween = game.add.tween(gameState.currentDancer).to({
                x: ('+160')
            }, 1000, pickRandomTween(), true);
            moveTween.onComplete.add(function() {
                if (gameState.currentDance[gameState.currentDanceIndex - 1].score() > 1) {
                    gameState.emitter.x = gameState.currentDancer.x - 20;
                    gameState.emitter.explode(4000, 10);
                }
            });

        }, this);

        var emoteDuration = Phaser.Timer.SECOND * 1;
        if (gameState.successRounds > 2) {
            emoteDuration = 500;
        }
        if (gameState.successRounds > 4) {
            emoteDuration = 250;
        }
        game.time.events.loop(emoteDuration, function() {
            emote();
        }, this);
        scoreDance();
    }

    update() {
        this.danceLabel.text = gameState.currentDance[gameState.currentDanceIndex].name;

        gameState.currentDance.text = gameState.currentDance.name;
        pose();
    }
};

function getMusic() {
    var musicSelection = game.rnd.integerInRange(1, 4);
    switch (musicSelection) {
        case 1:
            return "polka";
        case 2:
            return "polka2";
        case 3:
            return "polka3";
        case 4:
            return "polka4";
    }
}

function killEmotes() {
    if (!!gameState.emote1) {
        gameState.emote1.kill();
        gameState.emote2.kill();
        gameState.emote3.kill();
    }


}

function emote() {
    if (!!gameState.currentDanceIndex && gameState.currentDanceIndex <= gameState.currentDance.length - 1) {
        killEmotes();
        var emoteOffset = 45;

        if (!gameState.currentEmotedDanceIndex || gameState.currentEmotedDanceIndex < gameState.currentDanceIndex) {
            gameState.currentEmotedDanceIndex = gameState.currentDanceIndex;
            switch (gameState.currentDance[gameState.currentDanceIndex].score()) {
                case 3:
                    gameState.emote1 = drawEmote('happyEmote', gameState.judge1.centerX - emoteOffset);
                    gameState.emote2 = drawEmote('happyEmote', gameState.judge2.centerX - emoteOffset);
                    gameState.emote3 = drawEmote('happyEmote', gameState.judge3.centerX - emoteOffset);
                    break;
                case 2:
                    twoRandomJudgesEmote('happyEmote', emoteOffset);
                    break;
                case 1:
                    oneRandomJudgeEmotes('happyEmote', emoteOffset);
                    break;
                    // case 0:
                    // gameState.emote1 = drawEmote('neutralEmote', gameState.judge1.centerX - emoteOffset);
                    // gameState.emote2 = drawEmote('neutralEmote', gameState.judge2.centerX - emoteOffset);
                    // gameState.emote3 = drawEmote('neutralEmote', gameState.judge3.centerX - emoteOffset);
                    //   break;
                case -1:
                    oneRandomJudgeEmotes('madEmote', emoteOffset);
                    break;
                case -2:
                    twoRandomJudgesEmote('madEmote', emoteOffset);
                    break;
                case -3:
                    gameState.emote1 = drawEmote('madEmote', gameState.judge1.centerX - emoteOffset);
                    gameState.emote2 = drawEmote('madEmote', gameState.judge2.centerX - emoteOffset);
                    gameState.emote3 = drawEmote('madEmote', gameState.judge3.centerX - emoteOffset);
                    break;
            }
        }

    }
}

function oneRandomJudgeEmotes(emote, emoteOffset) {
    var judgeToEmote = (game.rnd.integerInRange(1, 3));
    switch (judgeToEmote) {
        case 1:
            gameState.emote1 = drawEmote(emote, gameState.judge1.centerX - emoteOffset);
            gameState.emote2 = drawEmote('neutralEmote', gameState.judge2.centerX - emoteOffset);
            gameState.emote3 = drawEmote('neutralEmote', gameState.judge3.centerX - emoteOffset);
            break;
        case 2:
            gameState.emote1 = drawEmote(emote, gameState.judge2.centerX - emoteOffset);
            gameState.emote2 = drawEmote('neutralEmote', gameState.judge1.centerX - emoteOffset);
            gameState.emote3 = drawEmote('neutralEmote', gameState.judge3.centerX - emoteOffset);
            break;
        case 3:
            gameState.emote1 = drawEmote(emote, gameState.judge3.centerX - emoteOffset);
            gameState.emote2 = drawEmote('neutralEmote', gameState.judge2.centerX - emoteOffset);
            gameState.emote3 = drawEmote('neutralEmote', gameState.judge1.centerX - emoteOffset);
            break;
    }
}

function twoRandomJudgesEmote(emote, emoteOffset) {
    var judgeToNotEmote = (game.rnd.integerInRange(1, 3));
    switch (judgeToNotEmote) {
        case 1:
            gameState.emote1 = drawEmote(emote, gameState.judge2.centerX - emoteOffset);
            gameState.emote2 = drawEmote(emote, gameState.judge3.centerX - emoteOffset);
            gameState.emote3 = drawEmote('neutralEmote', gameState.judge1.centerX - emoteOffset);
            break;
        case 2:
            gameState.emote1 = drawEmote(emote, gameState.judge1.centerX - emoteOffset);
            gameState.emote2 = drawEmote(emote, gameState.judge3.centerX - emoteOffset);
            gameState.emote3 = drawEmote('neutralEmote', gameState.judge2.centerX - emoteOffset);
            break;
        case 3:
            gameState.emote1 = drawEmote(emote, gameState.judge2.centerX - emoteOffset);
            gameState.emote2 = drawEmote(emote, gameState.judge1.centerX - emoteOffset);
            gameState.emote3 = drawEmote('neutralEmote', gameState.judge3.centerX - emoteOffset);
            break;
    }
}

function drawEmote(emoteToDraw, xPosition) {
    newEmote = game.add.sprite(xPosition, 0, emoteToDraw);
    newEmote.scale.setTo(0.5, 0.5);
    return newEmote;
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
    gameState.dancer.rightLeg.angle += (currentDance.pose.rightLeg - gameState.dancer.rightLeg.angle) * tweenSpeed;
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
    var sprite = game.add.sprite(-45 + offsetX, 200 + offsetY, spriteName);
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
    stamp = game.add.sprite(tmpXJudgePosition + (gameState.russianJudge.width / 2) - 40, 190, 'stamp');

}

function repositionScoreBar() {
    //console.log("Current votedScore: ", gameState.votedScore);
    gameState.scoreArrow.x = (gameState.voteMoveWidth * (gameState.votedScore)) - (gameState.scoreArrow.width / 2) + (gameState.voteBar.x);
}

function scoreDance() {
    gameState.objectiveScore = (gameState.maxScore / 2);
    for (var i in gameState.currentDance) {
        gameState.objectiveScore = gameState.objectiveScore + gameState.currentDance[i].score();
    }
    if (gameState.objectiveScore < gameState.minScore) {
        gameState.objectiveScore = gameState.minScore;
    }
    if (gameState.objectiveScore > gameState.maxScore) {
        gameState.objectiveScore = gameState.maxScore;
    }
}

export default Dancing;