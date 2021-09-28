k = 2 ;
var datos=[];
class Node {
	constructor ( point , axis ){
		this . point = point ;
		this . left = null ;
		this . right = null ;
		this . axis = axis ;
		this.x = point[0];
		this.y = point[1];
	}
}
function build_kdtree ( points , depth = 0 ){

	if(!points || points.length==0){
		return ;
	}
	var axis= depth % k;
	if(points.length==1){
		return new Node(points[0],axis);
	}
	else{
		points.sort((a, b) => a[axis] - b[axis]);

		var median= Math.floor(points.length/2);

		var  node=new Node(points[median],axis);
		node.left=build_kdtree(points.slice(0,median),depth+1);
		node.right=build_kdtree(points.slice(median+1),depth+1);
	}
	return node;
}
function getHeight ( node ) {
	if(node===null){
		return 0;
	}
	else{
		return Math.max(height(node.left), height(node.right)) + 1;
	}

}
function generate_dot ( node ){
	if(node===null){
		return null;
	}
	else{

		if(node.left){
			console.log('"'+node.point+'"'+"->"+'"'+node.left.point+'"');
			generate_dot(node.left);
		}
		if(node.right){
			console.log('"'+node.point+'"'+"->"+'"'+node.right.point+'"');
			generate_dot(node.right);
		}

	}
}
