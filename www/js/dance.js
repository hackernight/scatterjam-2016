var createDance = function() {
    var danceMoves = [{
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
    }, {
        name: "Head Spin",
        score: function() {
            return 2;
        },
        pose: {
            leftArm: 0,
            rightArm: 0,
            leftLeg: 90,
            rightLeg: -90,
        }
    }, {
        name: "Reeling Starfish",
        score: function() {
            return -3;
        },
        pose: {
            leftArm: 135,
            rightArm: -135,
            leftLeg: 45,
            rightLeg: -45,
        }
    }, {
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
    }, {
        name: "Toyota Jump",
        score: function() {
            return 0;
        },
        pose: {
            leftArm: 135,
            rightArm: -135,
            leftLeg: 0,
            rightLeg: 0,
        }
    }];
    //expansion ideas:
    //the robot
    //ballerina pirouette

    return danceMoves;
};
