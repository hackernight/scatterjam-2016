var judge_Result = function(game) {
    return {
        create: function() {
            console.log("Create called in ", game.state.current);
            if (gameState.objectiveScore > 0) {
                var judgeResultGood = game.add.sprite(0, 0, 'judgeResponseGood');
                gameState.judgeGood = judgeResultGood;
            } else {
                var judgeResultBad = game.add.sprite(0, 0, 'judgeResponseBad');
                gameState.judgeBad = judgeResultBad;
            }
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
