/// todos loscodigos !!!
k = 2;
let lista = [];
cont = 0;

class Rectangle {
	constructor ( x , y , w , h ){
		this.x = x ; //center
		this.y = y ;
		this.point = [x,y];
		this.w = w ; //half width
		this.h = h ; //half height
	}
// verifica si este objeto contiene un objeto Punto
	contains (point ){
		if (point.x <= this.x+this.w  && point.x >= this.x-this.w && point.y <= this.y+this.h  && point.y >= this.y-this.h){
			return true;
		}
		return false;
	}
// verifica si este objeto se intersecta con otro objeto Rectangle
	intersects ( range ){
		return !(range.x - range.w >this.x + this.w  || range.y +range.h < this.y -this.h ||
			range.y - range.h >this.y + this.h || range.x +range.w < this.x -this.w)
	}
}



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

    if (tamano() == 1 || distance < cabeza()[2] ){
    	insert([root.point[0],root.point[1],distance]);
    	if (tamano() > knn+1) remover();
    }else if ( tamano() < knn+1 ){
		insert([root.point[0],root.point[1],distance]);
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
	 var best = null;
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

function range_query_circle(root, query, radio, queue, depth = 0){
	if (root==null)
	    return null;

    var axis = depth % k
    var next_branch = null
    var opposite_branch = null
    var distance =  distanceSquared(query,root.point);
	cont+=1;
	if (query[axis] < root.point[axis]){
	   next_branch = root.left;
	   opposite_branch = root.right;
	}
	else{
		next_branch = root.right;
		opposite_branch = root.left;
	}
	best = closer_distance(query,range_query_circle(next_branch,query,radio,queue,depth+1),root.point);
    if (distance <=radio ){
    	queue.push(root.point);
	}
   	if (radio > Math.abs(query[axis] - root.point[axis])){
     	range_query_circle(opposite_branch,query,radio,queue,depth+1);
    }
    return best;
}
function range_query_rectangle(root,rect, queue, depth = 0){
	if (root==null)
	    return null;

    var axis = depth % k
    var next_branch = null
    var opposite_branch = null
    //var distance =  distanceSquared(query,root.point);
	cont+=1;
	if (axis == 0 && rect.w < root.point[axis]){ //rect.point[axis] < root.point[axis]){
	   next_branch = root.left;
	   opposite_branch = root.right;
	}
	else{
		next_branch = root.right;
		opposite_branch = root.left;
	}
	range_query_rectangle(next_branch,rect,queue,depth+1);
    if (rect.contains(root)){
    	console.log(root.point+" ");
    	queue.push(root.point);
	}
   	if (rect.intersects(new Rectangle(rect.point[axis],root.point[axis],0,0))){
   	//rect.w+rect.x > Math.abs(rect.point[axis] - root.point[axis]) || rect.h+rect.y > Math.abs(rect.point[axis] - root.point[axis])){
     	range_query_rectangle(opposite_branch,rect,queue,depth+1);
    }
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

	};

	MaxHeap();



    var data1 = [

    [40,70],

    [70,130],

    [90,40],

    [110, 100],

    [140,110],

    [160, 100],

    [150, 30]

     ];
	/*for ( let i = 0 ; i < 500 ; i ++){
        var x = Math.floor( Math.random () * height );
        var y = Math.floor( Math.random () * height );
        data1.push ([ x , y ]);
    }*/
    var point=[140,90]; // query

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

    //k_closest_point(root,point,0,lista,4);


	var radio = 90;
	//var cont = 0;
	let queue = [];
	//var rectan = new Rectangle(point[0],point[1],30,30);
	//range_query_circle(root,point,radio,queue);


	///////////////////////////////rectangle ///////////////////////////////
	noFill();
	stroke(0,255,0);
    rectMode(CENTER);
    let range = new Rectangle(point[0],height - point[1],10,10)//random(100),random(100))
    rect(range.x, range.y, range.w*2,range.h*2);

	range_query_rectangle(root,range,queue)


    /////////////////////////////////////////circle///////////////////////////////
	console.log(cont);
	noFill();
	circle(point[0],height - point[1],radio*2);
	//Color point
    fill ( 255 , 0 , 0);
    circle ( point[0] , height - point[1] , 7 ); //200-y para q se dibuje apropiadamente
    textSize ( 8 );
    text ( point[0] + ',' + point[1] , point[0] + 5 , height - point[1] );


    //lista = ordenar();

	for ( let i of queue){
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
