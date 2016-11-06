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

            text = game.add.text(gameState.judge2.centerX - 5, 30, gameState.objectiveScore, style);
            text.anchor.setTo(0.5, 0.5);
            text2 = game.add.text(gameState.draftJudge.centerX - 5, 30, gameState.objectiveScore, style);
            text2.anchor.setTo(0.5, 0.5);
            text3 = game.add.text(gameState.judge1.centerX - 5, 30, gameState.objectiveScore, style);
            text3.anchor.setTo(0.5, 0.5);
            text3 = game.add.text(gameState.russianJudge.centerX - 5, 30, gameState.votedScore, style);
            text3.anchor.setTo(0.5, 0.5);

            game.time.events.add(Phaser.Timer.SECOND * 4, giveFeedback, this);
        },

        update: function() {

        }

    };
};

function giveFeedback() {
    game.state.start("feedback");
}


game.state.add('judge_Result', judge_Result);
