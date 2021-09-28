/// todos loscodigos !!!
k = 2;
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
function closer_distance(point, p1, p2){
    if (p1===null)
        return p2;
    if (p2===null)
        return p1;
    var d1 = distanceSquared(point,p1);
    var d2 = distanceSquared(point,p2);
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

	 if (node === null)
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
	 //YOUR CODE HERE*
	 return best;
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
    //llenar  con datos aleatorios 
    var data=[];
    //llenar  con datos aleatorios 
    /*
    for ( let i = 0 ; i < 50 ; i ++){
        var x = Math.floor( Math.random () * height );
        var y = Math.floor( Math.random () * height );
        data.push ([ x , y ]);
        fill ( 255 , 255 , 255 );
        circle ( x , height - y , 7); //200-y para q se dibuje apropiadamente
        textSize ( 8 );
        text ( x + ',' + y , x + 5 , height - y ); //200-y para q se dibuje apropiadamente
    }*/
    var data1 = [
    [40,70],
    [70,130],
    [90,40],
    [110, 100],
    [140,110],
    [160, 100],
    [150, 30]
     ];	
    var point=[140,90];
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


    var Nears=nearest(root,point,4);

    for ( let i of Nears){
        fill ( 0 , 0 ,255 );
        circle ( i[0] , height - i[1] , 7 ); //200-y para q se dibuje apropiadamente
        textSize ( 8 );
        text ( i[0] + ',' + i[1] , i[0] + 5 , height - i[1] ); //200-y para q se dibuje apropiadamente
    }
	console.log(root.point);
	console.log(rpta);
	console.log(rpta1);
	console.log(rpta2);
    //console.log(rpta3);
    console.log(Nears);


}