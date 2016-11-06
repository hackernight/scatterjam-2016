var line = [];
var backstory = null;

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;
var content = [
    "Ivan the Terrible, you do not judge like your comrades",
    "Americanski says you take bribe, are not fit to judge",
    "You disgrace mother Russia!",
    "Interpretive dance serious business!",
    "We send you back to beginning, learn judging all over again",
    "Only then can you return for next Olympics"
];

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

            game.load.image('dancer-head', 'assets/dancer/draftDancer/head.png');
            game.load.image('dancer-leftArm', 'assets/dancer/draftDancer/leftArm.png');
            game.load.image('dancer-rightArm', 'assets/dancer/draftDancer/rightArm.png');
            game.load.image('dancer-leftHand', 'assets/dancer/draftDancer/leftHand.png');
            game.load.image('dancer-rightHand', 'assets/dancer/draftDancer/rightHand.png');
            game.load.image('dancer-leftFoot', 'assets/dancer/draftDancer/leftFoot.png');
            game.load.image('dancer-rightFoot', 'assets/dancer/draftDancer/rightFoot.png');
            game.load.image('dancer-leftLeg', 'assets/dancer/draftDancer/leftLeg.png');
            game.load.image('dancer-rightLeg', 'assets/dancer/draftDancer/rightLeg.png');
            game.load.image('dancer-torso', 'assets/dancer/draftDancer/torso.png');

            game.load.onLoadComplete.add(function() {
                // TODO kill this so you have an actual start menu
                //game.state.start('dancing');

                this.loadingText.destroy();
                var startButton = this.centeredText("Start Judging", game.world.centerY);
                startButton.inputEnabled = true;
                startButton.events.onInputDown.add(
                    function() {
                      game.stage.backgroundColor = "black";
                      var style = {
                          font: "32px Arial",
                          fill: "#19de65",
                          wordWrap: false,
                          //align: "center",
                          backgroundColor: "black"
                      };

                        backstory = game.add.text(32, 32, '', style);
                        startButton.destroy();
                        displayBackstory();

                    });
            }, this);
        },
        centeredText: function(ctext, y) {
            ctext = game.add.text(game.world.centerX, y, ctext);
            ctext.anchor.setTo(0.5, 0.5);
            return ctext;
        },
        // create: function() {
        //   text = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        // },
    };
};



function displayBackstory() {
  nextLine();

}

function nextLine() {

    if (lineIndex === content.length)
    {
        //  We're finished
        game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
        game.state.start('dancing');
        }, this);
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    backstory.text = backstory.text.concat(line[wordIndex] + " ");


    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        backstory.text = backstory.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}

game.state.add('startMenu', startMenu);
