k = 2;
class Node{
  constructor(point, axis){
    this.point = point;
    this.left = null;
    this.right = null;
    this.axis = axis;
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
  if(node.left!=null){
    console.log("\""+node.point+"\"->\""+node.left.point+"\";");
    generate_dot(node.left);
  }
  if(node.right!=null){
    console.log("\""+node.point+"\"->\""+node.right.point+"\";");
    generate_dot(node.right);
  }
}
function build_kdtree(points, depth = 0){
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
  nodes.left = build_kdtree(left, depth+1);
  nodes.right = build_kdtree(right, depth+1);
  return nodes;
}