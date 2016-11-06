var createDance = function() {
    var danceMoves = [{
        name: "Jazz Hands",
        score: function() {
            return 1;
        }
    }, {
        name: "Head Spin",
        score: function() {
            return 1;
        }
      }, {
          name: "The Worm",
          score: function() {
              return -1;
          }
        }, {
            name: "Moonwalk",
            score: function() {
                return 1;
            }
    }, {
        name: "Toyota Jump",
        score: function() {
            return 1;
        }
    }];
    //expansion ideas:
    //the robot
    //ballerina pirouette

    return danceMoves;
};
