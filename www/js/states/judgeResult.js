var judgeToDisplay;
var judgesChosen = [];
var judge_Result = function(game) {
    return {
        create: function() {
            //console.log("Create called in ", game.state.current);

            judgeToDisplay = 1;
            tmpXJudgePosition = 0;
            game.time.events.loop(Phaser.Timer.SECOND * 1, function() {
              displayJudge();
            });
        },

        update: function() {

        }

    };
};
var tmpXJudgePadder = 30;
var tmpXJudgePosition = 0;

function displayJudge() {
  var style = {
      font: "32px Arial",
      //fill: "#ff0044",
      wordWrap: false,
      align: "center",
      backgroundColor: "white"
  };

  //This will be where we can set the judges for each level.
  judgesChosen = [{'sprite':'judge2Score', 'stateName' : 'judge2'},
                    {'sprite':'judge3Score' , 'stateName' : 'judge3'},
                    {'sprite':'judge1Score', 'stateName' : 'judge1'}];

  if (judgeToDisplay <= 3){
      gameState[judgesChosen[judgeToDisplay-1].stateName].destroy();
      gameState[judgesChosen[judgeToDisplay-1].stateName] = game.add.sprite(tmpXJudgePosition, 0, judgesChosen[judgeToDisplay-1].sprite);
      tmpXJudgePosition = tmpXJudgePosition + gameState[judgesChosen[judgeToDisplay-1].stateName].width + tmpXJudgePadder;
      text = game.add.text(gameState[judgesChosen[judgeToDisplay-1].stateName].centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 4), style);
      text.anchor.setTo(0.5, 0.5);
  }

  if (judgeToDisplay==4){
      tmpXJudgePosition += tmpXJudgePadder;
      gameState.russianJudge.destroy();
      gameState.russianJudge = game.add.sprite(tmpXJudgePosition, 0, 'russianJudgeScore');
      text4 = game.add.text(gameState.russianJudge.centerX - 5, 30, gameState.votedScore/2, style);
      text4.anchor.setTo(0.5, 0.5);
      stamp = game.add.sprite(tmpXJudgePosition + (gameState.russianJudge.width / 2) - 40, 190, 'stamp');
  }

  if (judgeToDisplay==5){
    game.time.events.add(Phaser.Timer.SECOND * 2, giveFeedback, this);
  }
  judgeToDisplay++;

}

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
