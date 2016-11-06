var createDance = function() {
    var danceMoves = [{
        name: "Jazz Hands",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 90,
            rightArm: 0,
            leftLeg: 0,
            rightLeg: 15,
        }
    }, {
        name: "Head Spin",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 0,
            rightArm: 0,
            leftLeg: 10,
            rightLeg: 0,
        }
    }, {
        name: "The Worm",
        score: function() {
            return -1;
        },
        pose: {
            leftArm: 20,
            rightArm: -30,
            leftLeg: 0,
            rightLeg: -150,
        }
    }, {
        name: "Moonwalk",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: -30,
            rightArm: 0,
            leftLeg: 40,
            rightLeg: 0,
        }
    }, {
        name: "Toyota Jump",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 30,
            rightArm: 30,
            leftLeg: 0,
            rightLeg: 0,
        }
    }];
    //expansion ideas:
    //the robot
    //ballerina pirouette

    return danceMoves;
};
