var gameState = {
  votedScore: null,
  objectiveScore: null,
  currentDance: null,
  currentDanceIndex: 0,
  isKeyDown: 0

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
        },

        create: function() {
          console.log("Create called in ", game.state.current);
          var colin = game.add.sprite(0, 0, 'colin1');
          gameState.dancer = colin;
          gameState.votedScore = 0;


          upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
          upKey.onDown.add(function(){
                      gameState.votedScore++;
                      console.log("Current votedScore: ", gameState.votedScore);});
          downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
          downKey.onDown.add(function(){
                      gameState.votedScore--;
                      console.log("Current votedScore: ", gameState.votedScore);});
          gameState.currentDance = createDance();
          var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 100, align: "center", backgroundColor: "#ffff00" };
          this.danceLabel = game.add.text(0, 0, "Dancing!", style);
          game.time.events.loop(Phaser.Timer.SECOND * 3, function() {
            gameState.currentDanceIndex++;
          }, this);
           scoreDance();
        },

        update: function() {
          if (gameState.currentDanceIndex >= gameState.currentDance.length-1) {
            game.state.start("judge_Result");
          }
          this.danceLabel.text = gameState.currentDance[gameState.currentDanceIndex].name;
          // if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
          // {
          //   gameState.isKeyDown = 1;
          // }
          //
          // if (gameState.isKeyDown && game.input.keyboard.isUp(Phaser.Keyboard.UP))
          // {
          //   gameState.isKeyDown = 0;
          //   gameState.votedScore++;
          //   console.log("Current votedScore: ", gameState.votedScore);
          // }
          // else if (gameState.isKeyDown && game.input.keyboard.isUp(Phaser.Keyboard.DOWN))
          // {
          //   gameState.isKeyDown = 0;
          //   gameState.votedScore--;
          //   console.log("Current votedScore: ", gameState.votedScore);
          // }

          gameState.currentDance.text = gameState.currentDance.name;
        },

    };
};

function scoreDance(){
    gameState.objectiveScore = 0;
    for (var i in gameState.currentDance) {
      gameState.objectiveScore = gameState.objectiveScore + gameState.currentDance[i].score();
    }
}


game.state.add('dancing', dancing);
