// "Oppressive Gloom" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/

// "Meanwhile in Bavaria" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
//
// "DarxieLand" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
//
// "Blue Ska" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
//
// "Comin Round the Mountain" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
//
// "Sunflower Dance Party" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/
//
// "Upbeat Forever" Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 3.0 License
// http://creativecommons.org/licenses/by/3.0/

class StartMenu extends Phaser.State {
    preload() {
        this.game.stage.backgroundColor = "#aaaaaa";
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();

        this.centeredText("Russian Judge Redemption", 20);
        this.loadingText = this.centeredText("Loading", this.game.world.centerY);
        this.game.load.image('floor', 'assets/floorTile/draftFloor.png');
        this.game.load.image('judgeResponseGood', 'assets/judgeResponseGood.jpg');
        this.game.load.image('judgeResponseBad', 'assets/judgeResponseBad.jpg');
        this.game.load.image('feedbackResultGood', 'assets/feedback/happySprite.png');
        this.game.load.image('feedbackResultBad', 'assets/feedback/sadSprite.png');
        this.game.load.image('meterArrow', 'assets/meter-arrow.png');
        this.game.load.image('voteScoreBar', 'assets/vote-score-bar.png');
        this.game.load.image('russianJudge', 'assets/judge/russianJudge/normalSprite.png');
        this.game.load.image('judge1', 'assets/judge/1Judge/normalSprite.png');
        this.game.load.image('judge2', 'assets/judge/2Judge/normalSprite.png');
        this.game.load.image('judge3', 'assets/judge/3Judge/normalSprite.png');
        this.game.load.image('audience', 'assets/audience/audience.png');
        this.game.load.image('headAss', 'assets/intro/headAss.png');
        this.game.load.image('judge1Score', 'assets/judge/1Judge/scoreSprite.png');
        this.game.load.image('judge2Score', 'assets/judge/2Judge/scoreSprite.png');
        this.game.load.image('judge3Score', 'assets/judge/3Judge/scoreSprite.png');
        this.game.load.image('russianJudgeScore', 'assets/judge/russianJudge/scoreSprite.png');

        this.game.load.image('dancer-head', 'assets/dancer/mikeDancer/head.png');
        this.game.load.image('dancer-leftArm', 'assets/dancer/mikeDancer/leftArm.png');
        this.game.load.image('dancer-rightArm', 'assets/dancer/mikeDancer/rightArm.png');
        this.game.load.image('dancer-leftHand', 'assets/dancer/mikeDancer/leftHand.png');
        this.game.load.image('dancer-rightHand', 'assets/dancer/mikeDancer/rightHand.png');
        this.game.load.image('dancer-leftFoot', 'assets/dancer/mikeDancer/leftFoot.png');
        this.game.load.image('dancer-rightFoot', 'assets/dancer/mikeDancer/rightFoot.png');
        this.game.load.image('dancer-leftLeg', 'assets/dancer/mikeDancer/leftLeg.png');
        this.game.load.image('dancer-rightLeg', 'assets/dancer/mikeDancer/rightLeg.png');
        this.game.load.image('dancer-torso', 'assets/dancer/mikeDancer/torso.png');

        this.game.load.image('happyEmote', 'assets/judge/emotes/happyEmote.png');
        this.game.load.image('neutralEmote', 'assets/judge/emotes/neutralEmote.png');
        this.game.load.image('madEmote', 'assets/judge/emotes/madEmote.png');

        this.game.load.image('storyBackground', 'assets/intro/storyBackground.png');
        this.game.load.image('stamp', 'assets/intro/hammerSickle.png');

        this.game.load.audio('polka', 'assets/audio/BavariaShort.mp3');
        this.game.load.audio('polka2', 'assets/audio/BlueSkaShort.mp3');
        this.game.load.audio('polka3', 'assets/audio/DarxieLandShort.mp3');
        this.game.load.audio('polka4', 'assets/audio/SunflowerDancePartyShort.mp3');
        this.game.load.audio('dark', 'assets/audio/GloomShort.mp3');
        this.game.load.audio('boo', 'assets/audio/BooShort.mp3');
        this.game.load.audio('cheer', 'assets/audio/CheerShort.mp3');

        this.game.load.image('particle-star', 'assets/particle-star.png');

        this.game.load.onLoadComplete.add(function() {
            // TODO kill this so you have an actual start menu
            this.game.state.start('dancing');

            let headAss = this.game.add.sprite(0, 0, 'headAss');
            headAss.scale.setTo(6, 6);

            this.loadingText.destroy();
            var startButton = this.centeredText("Start Judging", this.game.world.centerY);
            this.createTitleFluff();

            startButton.inputEnabled = true;
            startButton.events.onInputDown.add(
                () => {
                    this.game.state.start('introText');
                });
        }, this);
    }
    centeredText(ctext, y) {
        ctext = this.game.add.text(this.game.world.centerX, y, ctext);
        ctext.anchor.setTo(0.5, 0.5);
        return ctext;
    }

    createTitleFluff() {
        let rJudges = this.game.add.group();
        rJudges.enableBody = true;
        rJudges.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++) {
            var headAss = rJudges.create(200 + i * 48, -50, 'stamp');

            //This allows your sprite to collide with the world bounds like they were rigid objects
            headAss.body.collideWorldBounds = true;
            headAss.body.gravity.x = this.game.rnd.integerInRange(-50, 50);
            headAss.body.gravity.y = 100 + Math.random() * 100;
            headAss.body.bounce.setTo(0.9, 0.9);
        }
    }

};

export default StartMenu;
