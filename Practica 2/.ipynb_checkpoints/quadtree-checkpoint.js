class Point {
	constructor ( x , y , userData ){
		this.x = x ;
		this.y = y ;
		this.userData = userData ;
	}
}
class Rectangle {
	constructor ( x , y , w , h ){
		this.x = x ; //center
		this.y = y ;
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

class QuadTree {
	constructor ( boundary , n ){
		this.boundary = boundary ; //Rectangle
		this.capacity = n ; //capacidad máxima de cada cuadrante
		this.points = []; //vector, almacena los puntos a almacenar
		this.divided = false ;
	}
//divide nuestro quadtree en 4 quadtrees
	subdivide (){
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w/2;
		let h = this.boundary.h/2;

		this.no = new Rectangle(x-w,y+h,w,h);
		this.ne = new Rectangle(x+w,y+h,w,h);
		this.so = new Rectangle(x-w,y-h,w,h);
		this.se = new Rectangle(x+w,y-h,w,h);


		/*
		this.no = new Rectangle(point.x-(point.w/2),point.y+(point.h/2),point.w/2,point.h/2);
		this.ne = new Rectangle(point.x+(point.w/2),point.y+(point.h/2),point.w/2,point.h/2);
		this.so = new Rectangle(point.x-(point.w/2),point.y-(point.h/2),point.w/2,point.h/2);
		this.se = new Rectangle(point.x+(point.w/2),point.y-(point.h/2),point.w/2,point.h/2);
		*/
		this.sonNO = new QuadTree(this.no, this.capacity);
		this.sonNE = new QuadTree(this.ne, this.capacity);
		this.sonSO = new QuadTree(this.so, this.capacity);
		this.sonSE = new QuadTree(this.se, this.capacity);

		this.divided = true;
//algoritmo
//1.- Se crean cuatro QuadTrees, uno por cada cuadrante (qt_northeast, qt_northwest,
	//	qt_southeast, qt_southwest() tener cuidado con el tamaño (boundary) de cada Quadtree.
//2.- Asignar los QuadTree creados a cada hijo (this.northeast, this.northwest,
	//	this.southeast, this.southwest(), ejemplo:
// this.northeast = qt_northeast;
//3.- Cambiar el flag this.divided a true
	}
	insert(point){
		if(!this.boundary.contains(point))
			return;

		if (this.points.length < this.capacity){
			this.points.push(point);
		}
		else{
			if(!this.divided){
				this.subdivide();
			}

			this.sonNO.insert(point);
			this.sonNE.insert(point);
			this.sonSO.insert(point);
			this.sonSE.insert(point);
		}

	}
//algoritmo
//1. Si el punto no está en los límites (boundary) del quadtree retornamos
//2. Si la cantidad puntos (this.points.length) es menor a la capacidad del quadtree
		//(this.capacity),
// 2.1 lo insertamos en el vector (this.points)
// caso contrario
// 2.2 dividimos si aún no ha sido dividido
// 2.3 insertamos el punto recursivamente en los 4 hijos restantes. ejemplo:
// this.northeast.insert(point);

	show()
	{
		stroke ( 255 );
		strokeWeight ( 1 );
		noFill ();
		rectMode ( CENTER );
		rect ( this.boundary.x , this.boundary.y , this.boundary.w * 2 , this.boundary.h * 2 );
			if ( this.divided ){
				this.sonNO.show();
				this.sonNE.show();
				this.sonSO.show();
				this.sonSE.show();
			}
			for ( let p of this.points ){
				strokeWeight (4 );
				point( p . x , p . y );
			}
	}
	query(range, found){
  //algoritmo
  //1.- Si el rango (range) no se intersecta con los límites del quadtree retornamos.
  if(!this.boundary.intersects(range)){
    return;
  }
  //2.- Hacemos un ciclo por cada punto de este queadtree (this.points) y verificamos si
  //están dentro del rango, si es así los insertamos en el vector found.
  for ( let p of this.points ){
    if(range.contains(p)){
      found.push(p);
      count++;
    }
	}
	console.log(found);
	if(this.divided==true){
	  this.sonNO.query(range,found);
	  this.sonNE.query(range,found);
	  this.sonSO.query(range,found);
	  this.sonSE.query(range,found);
	}

  }
}
