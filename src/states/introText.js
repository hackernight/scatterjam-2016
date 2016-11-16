class IntroText extends Phaser.State {
    constructor() {
        super();
        this.wordDelay = 120;
        this.lineDelay = 400;
        this.content = [
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

        this.line = [];

        this.wordIndex = 0;
        this.lineIndex = 0;
    }
    create() {
        this.game.stage.backgroundColor = "black";
        let style = {
            font: "32px Arial",
            fill: "black",
            wordWrap: false,
            //align: "center",
            //backgroundColor: "black"
        };
        this.game.add.sprite(0, 0, "storyBackground");
        this.backstory = this.game.add.text(90, 64, '', style);
        this.displayBackstory();
    }

    displayBackstory() {
        this.music = this.game.add.audio('dark');
        this.music.play();
        this.music.volume += 50.0;

        this.nextLine();

    }

    nextLine() {
        if (this.lineIndex === this.content.length) {
            //  We're finished
            this.game.add.sprite(625, 500, "stamp");

            this.game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
                this.music.stop();
                this.game.state.start('dancing');
            }, this);
            return;
        }

        //  Split the current line on spaces, so one word per array element
        this.line = this.content[this.lineIndex].split(' ');

        //  Reset the word index to zero (the first word in the line)
        this.wordIndex = 0;

        //  Call the 'nextWord' function once for each word in the line (line.length)
        this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

        //  Advance to the next line
        this.lineIndex++;

    }

    nextWord() {
        //  Add the next word onto the text string, followed by a space
        this.backstory.text = this.backstory.text.concat(this.line[this.wordIndex] + " ");

        //  Advance the word index to the next word in the line
        this.wordIndex++;

        //  Last word?
        if (this.wordIndex === this.line.length) {
            //  Add a carriage return
            this.backstory.text = this.backstory.text.concat("\n");

            //  Get the next line after the lineDelay amount of ms has elapsed
            this.game.time.events.add(this.lineDelay, this.nextLine, this);
        }

    }
}

export default IntroText;
