class IntroText extends Phaser.State {
    create(game) {
        game.stage.backgroundColor = "black";
        var style = {
            font: "32px Arial",
            fill: "black",
            wordWrap: false,
            //align: "center",
            //backgroundColor: "black"
        };
        bg = game.add.sprite(0, 0, "storyBackground");
        backstory = game.add.text(90, 64, '', style);
        displayBackstory();
    }
};

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

var line = [];
var backstory;
var bg;

var wordIndex = 0;
var lineIndex = 0;

function displayBackstory() {

    music = game.add.audio('dark');
    music.play();
    music.volume += 50.0;

    nextLine();

}

function nextLine() {

    if (lineIndex === content.length) {
        //  We're finished
        stamp = game.add.sprite(0, 0, "stamp");
        stamp.x = 625;
        stamp.y = 500;

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
    if (wordIndex === line.length) {
        //  Add a carriage return
        backstory.text = backstory.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}

export default IntroText;
