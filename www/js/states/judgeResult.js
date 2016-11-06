var judgeToDisplay;

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

    if (judgeToDisplay==1){
      gameState.judge2.destroy();
      gameState.judge2 = game.add.sprite(tmpXJudgePosition, 0, 'judge2Score');
      tmpXJudgePosition = tmpXJudgePosition + gameState.judge2.width + tmpXJudgePadder;
      text = game.add.text(gameState.judge2.centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 9), style);
      text.anchor.setTo(0.5, 0.5);
  }
  if (judgeToDisplay==2){
      gameState.judge3.destroy();
      gameState.judge3 = game.add.sprite(tmpXJudgePosition, 0, 'judge3Score');
      tmpXJudgePosition = tmpXJudgePosition + gameState.judge3.width + tmpXJudgePadder;
      text2 = game.add.text(gameState.judge3.centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 9), style);
      text2.anchor.setTo(0.5, 0.5);
  }
  if (judgeToDisplay==3){
      gameState.judge1.destroy();
      gameState.judge1 = game.add.sprite(tmpXJudgePosition, 0, 'judge1Score');
      tmpXJudgePosition = tmpXJudgePosition + gameState.judge1.width + tmpXJudgePadder * 2;
      text3 = game.add.text(gameState.judge1.centerX - 5, 30, addRandomness(gameState.objectiveScore/2, 3), style);
      text3.anchor.setTo(0.5, 0.5);
  }
  if (judgeToDisplay==4){
      gameState.russianJudge.destroy();
      gameState.russianJudge = game.add.sprite(tmpXJudgePosition, 0, 'russianJudgeScore');
      text4 = game.add.text(gameState.russianJudge.centerX - 5, 30, gameState.votedScore/2, style);
      text4.anchor.setTo(0.5, 0.5);
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
