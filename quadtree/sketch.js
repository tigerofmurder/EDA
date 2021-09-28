let qt;
let count = 0;
function setup(){
  createCanvas(400,400);

  let boundary = new Rectangle(200,200,200,200); //centre point and half of width and height

  qt = new QuadTree(boundary, 4); //each section just could have 4 elements
  console.log(qt);

  for (let i=0; i < 3; i++){
    let p = new Point(Math.random() * 400, Math.random() * 400);
    qt.insert(p);
  }
  background(0);
  qt.show();
}