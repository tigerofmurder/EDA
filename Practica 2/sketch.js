let qt;
let count = 0;
function setup(){
    createCanvas(400,400);
    let boundary = new Rectangle(200,200,200,200); //centr point and half of width and height
    qt = new QuadTree(boundary, 4); //each section just could have 4 elements
    for (let i=0; i < 5; i++){
        let p = new Point(Math.random() * 400, Math.random() * 400);
        qt.insert(p);
    }
    background(0);
    qt.show();
    stroke(0,255,0);
    rectMode(CENTER);
    let range = new Rectangle(random(200),random(200),random(50),random(50))
    rect(range.x, range.y, range.w*2,range.h*2);
    let points = [];
    qt.query(range, points);
    //console.log(points);
    for (let p of points){
        strokeWeight(4);
        point(p.x, p.y);
    }
    console.log(points);
    console.log(qt);
    console.log(count); //CANTIDAD DE VECES QUE CONSULTO
}
