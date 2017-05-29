var isNeighbor, reward;

isNeighbor = (xa,ya,xb,yb) => ((Math.abs(xa-xb) <=1 && ya==yb) || (Math.abs(ya-yb) <=1 && xa==xb ));

reward = (mat) =>
  mat.map( (originLine, originX) => originLine.map( (OriginCell,originY) =>
    mat.map( (destinyLine, destinyX) => destinyLine.map( (destinyCell, destinyY) =>
      isNeighbor(originX, originY, destinyX, destinyY) ? destinyCell : -1))));
//    isNeighbor(originX, originY, destinyX, destinyY) ? ''+destinyCell : '-'/*-1*/))));

module.exports = reward;

/*
//(Math.abs(xa-xb) <=1 && Math.abs(ya-yb) <=1 )//
R.forEach( (line,lineNum) => line.forEach( (cel,celNum) =>
  console.log("("+(lineNum+1)+","+(celNum+1)+")\n",cel)
));
Q.forEach( line => console.log(line));
console.log(Q);
*/
