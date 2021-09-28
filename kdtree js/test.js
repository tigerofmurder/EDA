k = 2;


function distanceSquared(point1, point2){
    var distance = 0;
    for (var i = 0; i < k; i++){
         distance += Math.pow((point1[i] - point2[i]), 2);
     }
    return Math.sqrt(distance);
}
function closest_point_brute_force(points, point){
	var minimo=100000;
	let point1=[];
    for(let i of points){
    	var value=distanceSquared(i,point);
    	if(value<minimo ){
    		minimo=value;
    		point1=i;
    	}
    }
    return point1;
}
function naive_closest_point(node, point, depth = 0, best = null){
	if (node==null)
	    return best
    var axis = depth % k
    var next_best = null
    var next_branch = null

    if (best==null or distanceSquared(point,best)>distanceSquared(point,node.point))
        next_best = node;
    else
        next_best = best;

    if (axis < node.axis)
        next_branch = node.left;
    else
        next_branch = node.right;
    return naive_closest_point(next_branch,point,depth+1,next_best);
//algorithm
 //1. best = min(distance(point, node.point), best)
 //2. chose the branch according to axis per level
 //3. recursevely call by branch chosed
}/*
var data = [
 [40,70],
 [70,130],
 [90,40],
  [110, 100],
 [140,110],
 [160, 100]
 ];
var point = [140,90];
var data = [
 [40,70],
 [70,130],
 [90,40],
 [110, 100],
 [140,110],
 [160, 100],
 [150, 30]
 ];*/
var point = [140,90];
function closest_point(node, point, depth = 0){
 //algorithm
 //1. set "next_branch" and "opposite_branch" to look for according to axis and level
 //2. chose "best" distance between (node.point, next_branch, point)
 //3. If (distance(point, "best") > abs(point[axis] - node.point[axis])
 //4. chose "best" distance between (node.point, opposite_branch,point)
 //5. return best
	 if (node === null)
	    return null;
	 var axis = depth % k;
	 var next_branch = null; //next node brach to look for
	 var opposite_branch = null; //opposite node brach to look for
	 if (point[axis] < node.point[axis]){
	    next_branch = node.left;
	    opposite_branch = node.right;
	 }else{
	    next_branch = node.right;
	    opposite_branch = node.left;
	 }
	 //YOUR CODE HERE
	 return best;
}



