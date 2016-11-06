var line = [];
var backstory = null;

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;
var content = [
    "Ivan, ",
    "You are terrible.",
    "You do not judge like your comrades.",
    "Americanski says you either take bribe",
    "  or never learn how to judge.",
    "You disgrace mother Russia!",
    "Interpretive dance serious business!",
    "We send you back to beginning, ",
    "  learn judging all over again.",
    "Then MAYBE you return for next Olympics.",
    "",
    "-- Minister of Cultural Emergencies"
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
            game.load.image('judge3', 'assets/judge/3Judge/normalSprite.png');
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

            game.load.image('happyEmote', 'assets/judge/emotes/happyEmote.png');
            game.load.image('neutralEmote', 'assets/judge/emotes/neutralEmote.png');
            game.load.image('madEmote', 'assets/judge/emotes/madEmote.png');

            game.load.audio('polka', 'assets/audio/LeekSpin.mp3');
            game.load.audio('dark', 'assets/audio/DarkOminousMusicShort.mp3');
            game.load.audio('boo', 'assets/audio/BooShort.mp3');
            game.load.audio('cheer', 'assets/audio/CheerShort.mp3');

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
    };
};



function displayBackstory() {
  music = game.add.audio('dark');
  music.play();

  nextLine();

}

function nextLine() {

    if (lineIndex === content.length)
    {
        //  We're finished
        game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
        music.stop();
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
