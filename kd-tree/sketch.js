function setup(){
  var width = 250;
  var height = 200;
  createCanvas(width,height);
  background(0);
  for (var x = 0; x < width; x += width / 10) {
    for (var y = 0; y < height; y += height / 5) {
      stroke(125, 125, 125);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
    }
  }
  var data = [];
  for(let i = 0; i < 12; i++){
    var x = Math.floor(Math.random() * height);
    var y = Math.floor(Math.random() * height);
    data.push([x, y]);
    fill(255, 255, 255);
    circle(x, height - y, 7);
    textSize(8);
    text(x + ',' + y, x + 5, height - y);
  }
  var root = build_kdtree(data);
  var alture = getHeight(root);
  punto = [140,90];

  var datas = [
                [40,70],
                [70,130],
                [90,40],
                [110,100],
                [140,110],
                [160,100],
                [150,30]
                ];


  var point = [140,90];
  var most_cerc =closest_point_brute(datas,point);
  var tree = build_kdtree(datas);
  var dot = generate_dot(tree);
  var most_cerca =naive_point(tree,point);
  var most_cercan =closest_point(tree,point);
  nEres(tree,point,3);
  console.log("\t---MAS---  ")
  console.log(most_cerc);
  console.log(most_cerca);
  console.log(most_cercan);
  //console.log(alture);
  //console.log(root,0);
  //console.log(dot);

  console.log("\t---MAS---  ")
	var kd= new kdtree();
	kd.insert(datas);
	kd.nEres(point,3);
}
