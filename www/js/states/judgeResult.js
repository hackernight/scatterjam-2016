var judge_Result = function(game) {
    return {
        create: function() {
            //console.log("Create called in ", game.state.current);
            var style = {
                font: "32px Arial",
                //fill: "#ff0044",
                wordWrap: false,
                align: "center",
                backgroundColor: "white"
            };

            text = game.add.text(gameState.judge2.centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 9), style);
            text.anchor.setTo(0.5, 0.5);
            text2 = game.add.text(gameState.draftJudge.centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 9), style);
            text2.anchor.setTo(0.5, 0.5);
            text3 = game.add.text(gameState.judge1.centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 3), style);
            text3.anchor.setTo(0.5, 0.5);
            text3 = game.add.text(gameState.russianJudge.centerX - 5, 30, addRandomness(gameState.votedScore/2, 3), style);
            text3.anchor.setTo(0.5, 0.5);

            game.time.events.add(Phaser.Timer.SECOND * 4, giveFeedback, this);
        },

        update: function() {

        }

    };
};

function addRandomness(baseScore, maxRandomness) {

  var randomizedNumber = (game.rnd.integerInRange(0, maxRandomness)/10);

  positive = game.rnd.integerInRange(0,1);
  if (positive === 0) {
    randomizedNumber = -1 * randomizedNumber;
  }
  randomizedNumber = randomizedNumber + baseScore;
  if (randomizedNumber < 0) {
    randomizedNumber = 0;
  }
  if (randomizedNumber > 10) {
    randomizedNumber = 10;
  }

  return randomizedNumber;
}

function giveFeedback() {
    game.state.start("feedback");
}


game.state.add('judge_Result', judge_Result);
