class Point{
  constructor(x, y, userData){
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}
class Rectangle{
  constructor(x, y, w, h){
    this.x = x; //center
    this.y = y;
    this.w = w; //half width
    this.h = h; //half height
  }
  // verifica si este objeto contiene un objeto Punto
  contains(point){
    if(point.x>=this.x-this.w && point.x<=this.w+this.x && point.y>=this.y-this.h && point.y<=this.y+this.h){
      return true;
    }
    return false;
  }
  // verifica si este objeto se intersecta con otro objeto Rectangle
  intersects(range){
    return !(range.x - eange.w > this.x + this.w ||
            range.x + eange.w < this.x - this.w ||
            range.y - eange.h > this.y + this.h ||
            range.y + eange.h < this.y - this.h)
}





class QuadTree{
  constructor(boundary, n){
    this.boundary = boundary; //Rectangle
    this.capacity = n; //capacidad máxima de cada cuadrante
    this.points = []; //vector, almacena los puntos a almacenar
    this.divided = false;
  }
  //divide nuestro quadtree en 4 quadtrees
  subdivide(){


    this.divided = true;
    x = this.boundary.x;
    y = this.boundary.y;
    w = this.boundary.w / 2;
    h = this.boundary.h / 2;


    this._ne = new QuadTree(new Rectangle(x + w, y, w, h), this._config, this._points.slice());
    this._nw = new QuadTree(new Box(x, y, w, h), this._config, this._points.slice());
    this._se = new QuadTree(new Box(x + w, y + h, w, h), this._config, this._points.slice());
    this._sw = new QuadTree(new Box(x, y + h, w, h), this._config, this._points.slice());

    // We empty this node points
    this._points.length = 0;
    this._points = [];


    //algoritmo
    QuadTree qt_northeast, qt_northwest, qt_southeast, qt_southwest;

    //1.- Se crean cuatro QuadTrees, uno por cada cuadrante (qt_northeast, qt_northwest,
    //qt_southeast, qt_southwest) tener cuidado con el tamaño (boundary) de cada Quadtree.
    //2.- Asignar los QuadTree creados a cada hijo (this.northeast, this.northwest,
    //this.southeast, this.southwest), ejemplo:
    // this.northeast = qt_northeast;
    this.northeast = qt_northeast
    this.northeast = qt_northeast
    this.northeast = qt_northeast


    //3.- Cambiar el flag this.divided a true
  }
  insert(point){
    //algoritmo
    //1. Si el punto no está en los límites (boundary) del quadtree retornamos
    if(!boundary.contains(point)){
      return;
    }
    //2. Si la cantidad puntos (this.points.length) es menor a la capacidad del quadtree
    //(this.capacity),
    // 2.1 lo insertamos en el vector (this.points)
    // caso contrario
    // 2.2 dividimos si aún no ha sido dividido
    // 2.3 insertamos el punto recursivamente en los 4 hijos restantes. ejemplo:
    // this.northeast.insert(point);
    if(this.points.length<this.capacity){
      this.point.push(point);
    }
    else{
      if(!this.divided)
        subdivide();
      this.northwest.insert(point);
      this.northeast.insert(point);
      this.southwest.insert(point);
      this.southeast.insert(point);
    }
  }
  show(){
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.boundary.x, this.boundary.y, this.boundary.w*2, this.boundary.h*2);
    if(this.divided){
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }
    for (let p of this.points){
      strokeWeight(4);
      point(p.x, p.y);
    }
  }
}

