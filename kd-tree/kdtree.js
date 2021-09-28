k = 2;
class Node{
  constructor(point, axis){
    this.point = point;
    this.left = null;
    this.right = null;
    this.axis = axis;
    this.parent = null;
  }
}

function getHeight(node) {
  var HL = 0;
  var HR = 0;
  if(node.left!=null){
    HL = getHeight(node.left);
  }
  if(node.right!=null){
    HR = getHeight(node.right);
  }
  if(HL > HR){
    return HL+1;
  }
  else{
    return HR+1;
  }

}
function generate_dot(node){

  if(node.right!=null){
    console.log("\""+node.point+"\"->\""+node.right.point+"\";");
    generate_dot(node.right);
  }
  if(node.left!=null){
    console.log("\""+node.point+"\"->\""+node.left.point+"\";");
    generate_dot(node.left);
  }
}
function build_kdtree(points, depth = 0,parent=null){
  n = points.length;
  var axis = depth%k;

  if(n<=0){
    return null;
  }
  if(n == 1){
    return new Node(points[0],axis);
  }
  var mediam = Math.floor(points.length /2);
  points.sort(function compare(a,b)
  {
    return b[axis] - a[axis];
  });

  //console.log(points);

  var left = points.slice(0,mediam);
  var right = points.slice(mediam+1);

  var nodes = new Node (points[mediam].slice(0,k),axis);
  nodes.parent = parent;
  nodes.left = build_kdtree(left, depth+1,nodes);
  nodes.right = build_kdtree(right, depth+1,nodes);
  return nodes;
}

function distanceSquared(point1, point2){
var distance = 0;
for (var i = 0; i < k; i++)
distance += Math.pow((point1[i] - point2[i]), 2);
return Math.sqrt(distance);
}


function closest_point_brute(points,point){
  var minimo = 100000;
  var point1 = [];
  for ( let p of points ){
	  var value = distanceSquared(p,point);

	console.log(p +"\t"+ value)
	  if(value < minimo){
	    minimo = value;
	    point1 = p;
	  }
	}
	return point1;
}

function naive_point(node,points,depth = 0,best = null){
  if (node == null){
     return best;
  }
  if(best==null || distanceSquared(best,points)>distanceSquared(node.point,points)){
      best = node.point;
  }
  if(node.point[node.axis] > points[node.axis]){
    return naive_point(node.right,points,depth+1,best);
  }
  else{
    return naive_point(node.left,points,depth+1,best);
  }
}

function closest_point(node, point, depth = 0){
  if (node === null)
    return null;
  var axis = depth % k;
  var next_branch = null;
  var opposite_branch = null;

  if (point[axis] < node.point[axis]){
    next_branch = node.left;
    opposite_branch = node.right;
  }
  else{
    next_branch = node.right;
    opposite_branch = node.left;
  }
  var p1 = node.point;
  var best = closer_point(p1,closest_point(next_branch,point,depth+1),point);
  if (distanceSquared(point,best)>Math.abs(point[axis]-node.point[axis])){
    best = closer_point(p1,closest_point(opposite_branch,point,depth+1),point)
  }
  return best;
}

function closer_point(p1,p2,point){
  if (p1 == null){
    return p2;
  }
  else{
    return p1;
  }
  if(distanceSquared(point,p1)>distanceSquared(point,p2)){
    return p2;
  }
  else{
    return p1;
  }
}


function nEres(node,point,n=1){
	var tmp = point;
	for (var i=0;i<n;i++){
		tmp = naive_point(node,tmp);
		node = removeNode1(node,tmp);
		postorder(node);
		generate_dot(node)
		console.log(node.point+" = "+tmp)
	}
}

function removeNode(node,key){
	if(node === null)
      return null;
  if (key[node.axis] < node.point[node.axis]) {
      node.left = removeNode(node.left, key);
      return node;
  }
  else if(key[node.axis] > node.point[node.axis]) {
      node.right = removeNode(node.right, key);
      return node;
  }
  else{
      if(node.left === null) {
          node = null
          var tmp = node.right;
          return tmp;
      }

      else if(node.right === null) {
          node = null
          var tmp = node.left;
          return node;
      }
      var aux = findMinNode(node.right);
      node.point = aux.point;

      node.right = removeNode(node.right, aux.point);

  }
  return node;
}

function removeNode1(node,key){
	if(!node)
      return null;
  else if (key[node.axis] < node.point[node.axis]) {
      node.left = removeNode(node.left, key);
      return node;
  }
  else if(key[node.axis] > node.point[node.axis]) {
      node.right = removeNode(node.right, key);
      return node;
  }
  else if(key == node.point){
      if(node.left && node.right) {
        var aux = findMinNode(node.right);
      	node.point = aux.point;
      	node.right = removeNode(node.right, aux.point);
      }
      else {
          node = node.left || node.right;
      }
  }
  return node;
}


function findMinNode(node) {
    if(node.left === null)
        return node;
    else
        return findMinNode(node.left);
}

function postorder(node)
{
    if(node != null)
    {
        postorder(node.left);
        postorder(node.right);
        console.log(node.point);
    }
}



class kdtree
{
	constructor()
	{
		this.root = null;
	}
	insert(data)
	{
		this.root = this.build_kdtree(data)
	}
	build_kdtree(points, depth = 0,parent=null){
		n = points.length;
		var axis = depth%k;

		if(n<=0){
		  return null;
		}
		if(n == 1){
		  return new Node(points[0],axis);
		}
		var mediam = Math.floor(points.length /2);
		points.sort(function compare(a,b)
		{
		  return b[axis] - a[axis];
		});

		var left = points.slice(0,mediam);
		var right = points.slice(mediam+1);

		var nodes = new Node (points[mediam].slice(0,k),axis);
		nodes.parent = parent;
		nodes.left = build_kdtree(left, depth+1,nodes);
		nodes.right = build_kdtree(right, depth+1,nodes);
		return nodes;
	}

	remove(data){
		this.root = this.removeNode(this.root,data);
	}

	removeNode(node,key){
		if(node === null)
		    return null;
		if (key[node.axis] > node.point[node.axis]) {
		    node.left = this.removeNode(node.left, key);
		    return node;
		}
		else if(key[node.axis] < node.point[node.axis]) {
		    node.right = this.removeNode(node.right, key);
		    return node;
		}
		else if (key == node.point){
		    if(node.left === null && node.right === null)
        {
            node = null;
            return node;
        }
        if(node.left === null)
        {
            node = node.right;
            return node;
        }
        else if(node.right === null)
        {
            node = node.left;
            return node;
        }
		    var aux = this.findMinNode(node.right);
		    node.point = aux.point;

		    node.right = this.removeNode(node.right, aux.point);

		}
		return node;
	}
	findMinNode(node) {
    if(node.left === null)
        return node;
    else
        return this.findMinNode(node.left);
	}
	nEres(point,n=1){
		var tmp = point;
		for (var i=0;i<n;i++){
			tmp = naive_point(this.root,tmp);
			this.remove(tmp);
			this.postorder(this.root);
			console.log(this.root.point+" = "+tmp)
		}
	}
	postorder(node)
	{
		  if(node != null)
		  {
		      this.postorder(node.left);
		      this.postorder(node.right);
		      console.log(node.point);
		  }
	}
}

