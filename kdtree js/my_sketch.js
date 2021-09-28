/// todos loscodigos !!!
k = 2;
let lista = [];


function distanceSquared(point1, point2){
    var distance = 0;
    for (var i = 0; i < k; i++){
         distance += Math.pow((point1[i] - point2[i]), 2);
     }
    return Math.sqrt(distance);
}
function closest_point_brute_force(points, point){
    var best_point = [];
    var best_distance = null;
    
    for (var current_point of points)
        var current_distance =  distanceSquared(point,current_point)
        if(best_distance==null || current_distance < best_distance);
            best_distance = current_distance;
            best_point = current_point;
    return best_point;
}

function naive_closest_point(node, point, depth = 0, best = null){
	if (node==null)
	    return best
    var axis = depth % k
    var next_best = null
    var next_branch = null

    if (best==null || distanceSquared(best,point)>distanceSquared(node.point,point))
        next_best = node.point;
    else
        next_best = best;

    if (point[axis] < node.point[axis])
        next_branch = node.left;
    else
        next_branch = node.right;
    return naive_closest_point(next_branch,point,depth+1,next_best);
}
function closer_distance(query, p1, p2){
    if (p1===null)
        return p2;
    if (p2===null)
        return p1;
    var d1 = distanceSquared(query,p1);
    var d2 = distanceSquared(query,p2);
    if (d1<d2)
        return p1;
    else
        return p2;
}
function closest_point(node, point, depth = 0){
 //algorithm
 //1. set "next_branch" and "opposite_branch" to look for according to axis and level
 //2. chose "best" distance between (node.point, next_branch, point)
 //3. If (distance(point, "best") > abs(point[axis] - node.point[axis])
 //4. chose "best" distance between (node.point, opposite_branch,point)
 //5. return best
	 if (node == null)
	    return null;
	 var axis = depth % k;
	 var next_branch = null; //next node brach to look for
	 var opposite_branch = null; //opposite node brach to look for
	 if (point[axis] < node.point[axis])
	 {
	    next_branch = node.left;
	    opposite_branch = node.right;
	 }
	 else{
	    next_branch = node.right;
	    opposite_branch = node.left;
	 }
	 
	 best = closer_distance(point,closest_point(next_branch,point,depth+1),node.point);

     if (distanceSquared(point,best) > Math.abs(point[axis] - node.point[axis])){
     	 var aux = closest_point(opposite_branch,point,depth+1);
         best = closer_distance(point,aux,best);
     }
	 return best;
}

function k_closest_point(root, query, depth = 0,lista,knn){
	//if (root != null)console.log("root"+root.point);
	if (root==null)
	    return null;
    var axis = depth % k
    var next_branch = null
    var distance =  distanceSquared(query,root.point);
	if (query[axis] < root.point[axis])
	{
	   var next_branch = root.left;
	   var opposite_branch = root.right;
	}
	else{
	  var  next_branch = root.right;
	  var  opposite_branch = root.left;
	}
   // if (next_branch == null && lista.length==0) lista.push( [root.point[0],root.point[1],distance] );
   	
   	k_closest_point(next_branch,query,depth+1,lista,knn);

    if (lista.length == 0 || distance < lista[lista.length-1][2] ){
    	lista.push([root.point[0],root.point[1],distance]); 
    	lista.sort((a, b) => a[2] - b[2]);
    	if (lista.length > knn) lista.length = knn;
    }else if ( lista.length < knn ){
		lista.push([root.point[0],root.point[1],distance]);  
	}
	//console.log("dis"+distance +">"+Math.abs(query[axis] - root.point[axis]) )
   	if ( distance > Math.abs(query[axis] - root.point[axis])){
   		//console.log("opposite_branch");
     	 k_closest_point(opposite_branch,query,depth+1,lista,knn);
        // best = closer_distance(query,aux,best);
    }
}

function k_closest_points(root, query, depth = 0,lista,k){
	 if (root == null)
	    return null;
	 var axis = depth % k;
	 var next_branch = null; //next node brach to look for
	 var opposite_branch = null; //opposite node brach to look for

	distance =  distanceSquared(query,root) ;
	if (lista.empty()) { lista.push([root.point[0],root.point[1],distance]) }

	if (lista[lista.length-1][2] > distance ) {
		lista.push([root.point[0],root.point[1],distance]);  
		lista.sort((a, b) => a[2] - b[2]);
	}else if ( lista.length < k ){
		lista.push([root.point[0],root.point[1],distance]);  
	}
	if (query[axis] < root.point[axis])
	{
	    next_branch = root.left;
	    opposite_branch = root.right;
	}
	else{
	    next_branch = root.right;
	    opposite_branch = root.left;
	}	 
	best = closer_distance(query,k_closest_points(next_branch,query,depth+1,lista,k),root.point);

   	if (distanceSquared(query,best) > Math.abs(query[axis] - root.point[axis])){
     	 var aux = closest_point(opposite_branch,query,depth+1);
         best = closer_distance(query,aux,best);
    }
     

}

function search(root,results)
{
    if(root==null){
        return null;
    }else{
        results.push(root.point);
        if(root.left){
            search(root.left,results);
        }
        if(root.right){
            search(root.right,results);
        }
    }
}
function search1(point,results,results2)
{
    if(results.length===0){
        return;
    }else{
        for (var i of results){
            var a=distanceSquared(i,point);
            results2.push([i,a]);
        }
    }

}
function nearest(root,point,count){
    var count = count || 1;
    var results = [];
    var results2 = [];
    var rpta = [];
    search(root,results);
    search1(point,results,results2);
    results2.sort((a, b) => a[1] -b[1]);
    for(var i=0;i<count;i++){
        rpta.push(results2[i][0]);
    }
    return rpta;
}

function setup (){	
	var width = 250 ;
	var height = 200 ;
	createCanvas ( width , height );
	background ( 0 );
	for ( var x = 0 ; x < width ; x += width / 10 ) {
		for ( var y = 0 ; y < height ; y += height / 5 ) {
			stroke ( 125 , 125 , 125 );
			strokeWeight ( 1 );
			line ( x , 0 , x , height );
			line ( 0 , y , width , y );
		}
	}

	
    var data1 = [
    [40,70],
    [70,130],
    [90,40],
    [110, 100],
    [140,110],
    [160, 100],
    [150, 30]
     ];	
    var point=[140,90]; // query
    fill ( 255 , 0 , 0);
    circle ( point[0] , height - point[1] , 7 ); //200-y para q se dibuje apropiadamente
    textSize ( 8 );
    text ( point[0] + ',' + point[1] , point[0] + 5 , height - point[1] );
 	for ( let i of data1){
		fill ( 255 , 255 , 255 );
		circle ( i[0] , height - i[1] , 7 ); //200-y para q se dibuje apropiadamente
		textSize ( 8 );
		text ( i[0] + ',' + i[1] , i[0] + 5 , height - i[1] ); //200-y para q se dibuje apropiadamente
	}
	var root = build_kdtree(data1);
	var rpta = closest_point_brute_force(data1,point);
	var rpta1=  naive_closest_point(root,point);
	var rpta2 = closest_point(root,point);
    k_closest_point(root,point,0,lista,5);


    //var Nears=nearest(root,point,4);

    for ( let i of lista){
        fill ( 0 , 0 ,255 );
        circle ( i[0] , height - i[1] , 7 ); //200-y para q se dibuje apropiadamente
        textSize ( 8 );
        text ( i[0] + ',' + i[1] , i[0] + 5 , height - i[1] ); //200-y para q se dibuje apropiadamente
    }
	console.log(root.point);
	console.log(rpta);
	console.log(rpta1);
	console.log(rpta2);
	console.log(lista);
  //  console.log(Nears);


}