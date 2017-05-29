var setReward = require('./reward.jsm');
var q = require('./q.jsm');
var environment = require('./environment.jsm');

var MAT_STATES, INITIAL_STATE, GAMMA;
({MAT_STATES, INITIAL_STATE, GAMMA} = environment);

/*
  Generates the reward matrix
*/
var reward = setReward(MAT_STATES);


/*
  Returns a matrix of zeroes with original dimensions from argument matrix
*/
var zeroTable = (mat) => mat.map( line => line.map( e =>  0));

/*
  STRATEGIES DEFINITIONS:

  Strategy1:
    The action will be a randomic neighbor, and Q Table will be updated.

  Strategy2:
    EITHER  the action will be the neighbor with greatest Q value, and Q Table will be updated
    OR      the action will be a randomic neighbor, and Q Table will NOT be updated.

  Strategy3:
    The action will be the neighbor with greatest Q value, and Q Table will NOT be updated
*/
var strategy1 = (neighbors, qtxy) => {
  return {
    action: neighbors[Math.floor((10*Math.random())%neighbors.length)],
    change: true
  }
};
var strategy2 = (neighbors, qtxy) => {
  return Math.random()>=0.5 ? {
    action: neighbors[Math.floor((10*Math.random())%neighbors.length)],
    change: true
  } : {
    action: neighbors.reduce((e,a)=>qtxy[e.x][e.y]>qtxy[a.x][a.y]?e:a),
    change: false
  }
};
var strategy3 = (neighbors, qtxy) => {
  return {
    action: neighbors.reduce((e,a)=>qtxy[e.x][e.y]>qtxy[a.x][a.y]?e:a),
    change:false
  }
};

/*
  Called after the algorithm is finished.
  Walks through the matrix from INITIAL_STATE to a certain point and counts the steps.
*/
var walk = (qTable, c, INITIAL_STATE) => {
  //console.log(c);
  q(MAT_STATES, INITIAL_STATE, GAMMA, reward, qTable, 0, (neighbors, qtxy) => strategy3(neighbors, qtxy), 0, '('+INITIAL_STATE.x+','+INITIAL_STATE.y+') => ', (i, qTable, q, reward, c, steps) =>
    console.log('\n\nBEST PATH has '+c+' steps: '+steps)
  );
};

/*
  Prints out the Q-Table
*/
var print = (qTable, c, callback) => qTable.map(line => line.map(col =>
  col.map( colline => colline.map( colcol =>
    colcol==0 ? 0 : parseFloat(colcol).toFixed(4)
  ))
))
.forEach((line,x,A)=> line.forEach((col,y,B) => {
  console.log("\n("+x+","+y+")\n\t\t0\t1\t2\t3\t4\t5\t6\t7\t8\t9\n\t  ---------------------------------------------------------------------------------------");
  col.forEach((item, itemN) =>
    console.log('\t'+itemN+" [\t"+item[0]+"\t"+item[1]+"\t"+item[2]+"\t"+item[3]+"\t"+item[4]
                          +"\t"+item[5]+"\t"+item[6]+"\t"+item[7]+"\t"+item[8]+"\t"+item[9]+" \t]")
  );
  console.log("\t  ---------------------------------------------------------------------------------------");

  if ( x==(A.length-1) && y==(B.length-1)) callback(qTable, c, INITIAL_STATE);
}));

/*
  Q Table is initialized with zero values:
    Each cell of MAT_STATES matrix will be a matrix of zeroes with dimensions of MAT_STATES matrix.
*/
var qTable = MAT_STATES.map( line => line.map( col =>
  zeroTable(MAT_STATES)
));

/*
  Setting initial strategy
*/
var strategy = strategy1;

/*
  Will set enviroment each time a GOAL STATE has been reached.
*/
var check = (i, qTable, q, reward, c, callback) =>{
  if ( i == 50 ) {GAMMA = 0.5;strategy=strategy2;}
  else if ( i == 100 ) {GAMMA = 0.2;strategy=strategy3;}
  if ( i < 150 ) setTimeout(()=>q(MAT_STATES, INITIAL_STATE, GAMMA, reward, qTable, i, (neighbors, qtxy) => strategy(neighbors, qtxy), c, '', (i, qTable, q, reward, c) =>
    check(i, qTable, q, reward, c, callback)
  ),1);
  // if the episodes have been finished, prints out a human-friendly Q Table.
  else print(qTable, c, callback);

}

// LET'S DO IT!

q(MAT_STATES, INITIAL_STATE, GAMMA, reward, qTable, 0, (neighbors, qtxy) => strategy(neighbors), 0, '', (i, qTable, q, reward, c, steps) =>
  check(i, qTable, q, reward, c, (qTable, c, INITIAL_STATE)=>walk(qTable, c, INITIAL_STATE))
);



//reward.forEach(line => console.log(line));

//console.log('',result);

//console.log('',reward[5][9]);

//console.log('',reward);
