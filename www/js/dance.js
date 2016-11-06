var createDance = function() {
    var danceMoves = [{
        name: "Jazz Hands",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 30,
            rightArm: 0,
            leftLeg: 0,
            rightLeg: 0,
        }
    }, {
        name: "Head Spin",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 0,
            rightArm: 30,
            leftLeg: 0,
            rightLeg: 0,
        }
    }, {
        name: "The Worm",
        score: function() {
            return -1;
        },
        pose: {
            leftArm: 0,
            rightArm: 0,
            leftLeg: 30,
            rightLeg: 0,
        }
    }, {
        name: "Moonwalk",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 0,
            rightArm: 0,
            leftLeg: 0,
            rightLeg: 30,
        }
    }, {
        name: "Toyota Jump",
        score: function() {
            return 1;
        },
        pose: {
            leftArm: 30,
            rightArm: 0,
            leftLeg: 0,
            rightLeg: 0,
        }
    }];
    //expansion ideas:
    //the robot
    //ballerina pirouette

    return danceMoves;
};
