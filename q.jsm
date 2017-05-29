var qTable, maxNext, maxAction, q, qi, i=1;

maxAction = (mat, {x,y}, reward, qt) => {
  var neighbors=[];

  if (x>0&&mat[x-1][y]!=-1) neighbors.push({x:x-1,y:y});
  if (y>0&&mat[x][y-1]!=-1) neighbors.push({x:x,y:y-1});
  if (x<5&&mat[x+1][y]!=-1) neighbors.push({x:x+1,y:y});
  if (y<9&&mat[x][y+1]!=-1) neighbors.push({x:x,y:y+1});

  //neighbors.forEach( e=> console.log(qt[x][y][e.x][e.y],e));

  decision = neighbors.reduce( (e,a) =>
    qt[x][y][e.x][e.y] > qt[x][y][a.x][a.y] ? e : a
  );

  //console.log('->',qt[x][y][decision.x][decision.y],decision,'<-');

  return qt[x][y][decision.x][decision.y];

};

//qi = (reward, GAMMA, stateX, stateY, actionX, actionY, mat) => reward[stateX][stateY][actionX][actionY]+GAMMA*maxNext(reward, GAMMA, actionX, actionY, mat);

q = (mat, {x,y}, GAMMA, reward, qTable, i, strategy, c, steps, callback) => {
  if(mat[x][y]==100) callback(++i, qTable, q, reward, c, steps);

  else{

    var neighbors = [],
        action={x:0,y:0},
        maxFound;

    if (x>0&&mat[x-1][y]!=-1) neighbors.push({x:x-1,y:y});
    if (y>0&&mat[x][y-1]!=-1) neighbors.push({x:x,y:y-1});
    if (x<5&&mat[x+1][y]!=-1) neighbors.push({x:x+1,y:y});
    if (y<9&&mat[x][y+1]!=-1) neighbors.push({x:x,y:y+1});

    step = strategy(neighbors, qTable[x][y]);

    steps+='('+step.action.x+','+step.action.y+') ';

    maxFound = maxAction(mat, step.action, reward, qTable);

    if (step.change) qTable[x][y][step.action.x][step.action.y]=reward[x][y][step.action.x][step.action.y] + GAMMA * maxFound;

    /*if(qti==100)*/ //console.log('('+x+','+y+') -> ('+action.x+','+action.y+') = '+reward[x][y][action.x][action.y]+' + '+GAMMA+' * '+maxFound+' = '+qTable[x][y][action.x][action.y]);

    q(mat, step.action, GAMMA, reward, qTable, i, strategy, ++c, steps, callback);


  }


};

module.exports = q;

/*

doQTable = (mat) => mat.map( line => line.map( e => e==-1 ? e : 0));

isNeighbor = (xa,ya,xb,yb) => ((Math.abs(xa-xb) <=1 && ya==yb) || (Math.abs(ya-yb) <=1 && xa==xb ));

maxNext = (reward, GAMMA, x,y, mat) => {
//console.log(i++);
//console.log('\nreward\n',reward,'\nGAMMA\n',GAMMA,'\nx\n',x,'\ny\n',y,'\nmat\n',mat);
//return -1;
  if(mat[x][y]==100) return 100;
  else if (mat[x][y]==-1) return -1;
  else return Math.max(
    (x<5&&y<9) ? qi(reward,GAMMA,x,y,x+1,y+1, mat) : -1,
    (x<5&&y>0) ? qi(reward,GAMMA,x,y,x+1,y-1, mat) : -1,
    (x>0&&y<9) ? qi(reward,GAMMA,x,y,x-1,y+1, mat) : -1,
    (x>0&&y>0) ? qi(reward,GAMMA,x,y,x-1,y-1, mat) : -1
  );
  };
*/

/*
mat.forEach( (originLine, x) => originLine.forEach( (originCell, y) => {
  if (x<5&&y<9) qTable[x][y]=qi(reward, GAMMA, x, y, x+1, y+1, mat);
  else if (x<5&&y>0) qTable[x][y]=qi(reward, GAMMA, x, y, x+1, y-1, mat);
  else if (x>0&&y<9) qTable[x][y]=qi(reward, GAMMA, x, y, x-1, y+1, mat);
  else if (x>0&&y>0) qTable[x][y]=qi(reward, GAMMA, x, y, x-1, y-1, mat);
  //qTable[x][y]=qi(reward, GAMMA, originX, originY, destinyX, destinyY, mat);
  // callback(qTable);
}));
*/

//mat.forEach(e=>console.log(e))//console.log(Array.isArray(mat))//reward.forEach(x=>console.log);

/*  mat.forEach( (originLine, originX) => originLine.forEach( (originCell, originY) =>
    mat.forEach( (destinyLine, destinyX) => destinyLine.forEach( (destinyCell, destinyY) =>
      console.log(qi(reward, GAMMA, originX, originY, destinyX, destinyY, mat))
  ))));*/
