/*
  The initial GAMMA value must be 0.8, and the initial point is placed on (3,0)
*/
var GAMMA = 0.8, INITIAL_STATE = {x:3, y:0};//{x:0,y:3},//

/*
  The Matrix of States is based on the given problem.
  Zeros are setted to available paths,
  -1 is the value to a invalid state. Here, the walls,
  100 represents the goal states.
*/
var  MAT_STATES = [
  [  0,   0,   0,   0,   0,   0,   0,  -1,  -1,  -1],
  [  0,   0,  -1, 100,  -1,   0,  -1,  -1,   0,  -1],
  [ -1,   0,   0,  -1,   0,   0,   0,   0,   0,  -1],
  [  0,   0,  -1,   0,  -1,   0,  -1,   0,   0, 100],
  [  0,   0,  -1,   0,   0,   0,   0,   0,   0,  -1],
  [  0,   0,   0,   0,  -1,   0,   0,   0,   0,  -1]
];


var enviroment = {MAT_STATES, INITIAL_STATE, GAMMA};

module.exports = enviroment;
