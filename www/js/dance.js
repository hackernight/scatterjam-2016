var createDance = function() {

    var restingState ={
        name: "",
        score: function() {
            return 0;
        },
        pose: {
            leftArm: 0,
            rightArm: 0,
            leftLeg: 0,
            rightLeg: 0,
        }
    };

    function getRandomMove(){

        var randomizedNumber = (game.rnd.integerInRange(1, 5));

            switch(randomizedNumber) {
              case 1:
              return {
                  name: "Jazz Hands",
                  score: function() {
                      return 3;
                  },
                  pose: {
                      leftArm: 150,
                      rightArm: -150,
                      leftLeg: 0,
                      rightLeg: 0,
                  }
              };
              case 2:
              return {
                  name: "Catching Air",
                  score: function() {
                      return 2;
                  },
                  pose: {
                      leftArm: 0,
                      rightArm: 0,
                      leftLeg: 90,
                      rightLeg: -90,
                  }
              };
              case 3:
              return {
                  name: "Reeling Starfish",
                  score: function() {
                      return -2;
                  },
                  pose: {
                      leftArm: 135,
                      rightArm: -135,
                      leftLeg: 45,
                      rightLeg: -45,
                  }
              };
              case 4:
              return {
                  name: "Moonwalk",
                  score: function() {
                      return 1;
                  },
                  pose: {
                      leftArm: 0,
                      rightArm: 0,
                      leftLeg: -30,
                      rightLeg: 30,
                  }
              };
              case 5:
              return {
                  name: "Big Finish",
                  score: function() {
                      return 2;
                  },
                  pose: {
                      leftArm: 135,
                      rightArm: -135,
                      leftLeg: 0,
                      rightLeg: 0,
                  }
              };
              }

    }

    var danceMoves = [restingState, getRandomMove(), getRandomMove(), getRandomMove(), getRandomMove(), getRandomMove(), restingState, ];
    //expansion ideas:
    //the robot
    //ballerina pirouette

    return danceMoves;
};
