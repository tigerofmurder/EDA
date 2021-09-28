import vtk

dots=[]
actors=[]

def rect(x,y,z,w,h,p,color):
    cube=vtk.vtkCubeSource()
    cube.SetXLength(w)
    cube.SetYLength(h)
    cube.SetZLength(p)
    cube.SetCenter(x,y,z)

    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())

    cubeActor=vtk.vtkActor()
    cubeActor.GetProperty().SetColor(color[0],color[1],color[2])
    cubeActor.GetProperty().SetOpacity(0.5)
    cubeActor.SetMapper(cubeMapper)

    actors.append(cubeActor)

def dot(x,y,z,color):
    #dots.append([x,y,z])
    cube=vtk.vtkSphereSource()
    cube.SetRadius(6.0)
    cube.SetCenter(x,y,z)

    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())

    cubeActor=vtk.vtkActor()
    cubeActor.GetProperty().SetColor(color[0],color[1],color[2])
    cubeActor.SetMapper(cubeMapper)

    dots.append(cubeActor)

def screen():
    """
    points = vtk.vtkPoints()
    pid = []
    for p1 in dots:
        pid.append(points.InsertNextPoint(p1))

    vertices = vtk.vtkCellArray()
    vertices.InsertNextCell(len(pid), pid)

    point = vtk.vtkPolyData()
    point.SetPoints(points)
    point.SetVerts(vertices)

    mapper = vtk.vtkPolyDataMapper()
    mapper.SetInputData(point)

    actor = vtk.vtkActor()
    actor.SetMapper(mapper)
    actor.GetProperty().SetPointSize(10)
"""
    ren = vtk.vtkRenderer()
    #ren.AddActor(cubeActor)
    #ren.AddActor(actor)
    for act in dots:
        ren.AddActor(act)

    for act in actors:
        ren.AddActor(act)

    renWin = vtk.vtkRenderWindow()
    renWin.AddRenderer(ren)
    renWin.SetSize(600, 600)
    iren = vtk.vtkRenderWindowInteractor()
    iren.SetRenderWindow(renWin)
    ren.SetBackground(0,0,0)
    renWin.Render()
    iren.Start()

class Point:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

class Rectangle:
    def __init__(self, x, y, z, w, h, p):
        self.x = x
        self.y = y
        self.z = z
        self.w = w
        self.h = h
        self.p = p
    def contains(self, point):
        return point.x >= self.x - self.w and point.x <= self.x + self.w and point.y >= self.y - self.h and point.y <= self.y + self.h and point.z >= self.z - self.p and point.z <= self.z + self.p
    def intersect(self, rank):
        return not (rank.x-rank.w>self.x+self.w or rank.x+rank.w<self.x-self.w or rank.y-rank.h>self.y+self.h or rank.y+rank.h<self.y-self.h or rank.z-rank.p >self.z+self.p or rank.z+rank.p<self.z-self.p)


class Octree:
    def __init__(self, boundary, n,color=[1,1,1]):
        self.boundary = boundary
        self.capacity = n
        self.points = []
        self.divided = False
        self.color=color

    def subdivide(self):
        x = self.boundary.x
        y = self.boundary.y
        z = self.boundary.z
        w = self.boundary.w/2
        h = self.boundary.h/2
        p = self.boundary.p/2

        noup = Rectangle(x-w,y+h,z+p,w,h,p);
        neup = Rectangle(x+w,y+h,z+p,w,h,p);
        soup = Rectangle(x-w,y-h,z+p,w,h,p);
        seup = Rectangle(x+w,y-h,z+p,w,h,p);

        nodw = Rectangle(x-w,y+h,z-p,w,h,p);
        nedw = Rectangle(x+w,y+h,z-p,w,h,p);
        sodw = Rectangle(x-w,y-h,z-p,w,h,p);
        sedw = Rectangle(x+w,y-h,z-p,w,h,p);

        self.sonNOup = Octree(noup,self.capacity,[noup.x/254,noup.y/250,self.boundary.p-noup.z/236])
        self.sonNEup = Octree(neup,self.capacity,[neup.x/254,neup.y/250,self.boundary.p-neup.z/236])
        self.sonSOup = Octree(soup,self.capacity,[soup.x/254,soup.y/250,self.boundary.p-soup.z/236])
        self.sonSEup = Octree(seup,self.capacity,[seup.x/254,seup.y/250,self.boundary.p-seup.z/236])

        self.sonNOdw = Octree(nodw,self.capacity,[nodw.x/254,nodw.y/250,self.boundary.p-nodw.z/236])
        self.sonNEdw = Octree(nedw,self.capacity,[nedw.x/254,nedw.y/250,self.boundary.p-nedw.z/236])
        self.sonSOdw = Octree(sodw,self.capacity,[sodw.x/254,sodw.y/250,self.boundary.p-sodw.z/236])
        self.sonSEdw = Octree(sedw,self.capacity,[sedw.x/254,sedw.y/250,self.boundary.p-sedw.z/236])

        self.divided = True



    def insert(self, point):
        if not self.boundary.contains(point):
            return
        if len(self.points) < self.capacity:
            self.points.append(point)
        else:
            if self.divided==False:
                self.subdivide()
            self.sonNOup.insert(point)
            self.sonNEup.insert(point)
            self.sonSOup.insert(point)
            self.sonSEup.insert(point)
            self.sonNOdw.insert(point)
            self.sonNEdw.insert(point)
            self.sonSOdw.insert(point)
            self.sonSEdw.insert(point)



    def query(self,rank,found):
        if(not self.boundary.intersect(rank)):
            return
        for p in self.points:
            if(rank.contains(p)):
                found.append(p)
        if(self.divided == True):
            self.sonNOup.query(rank,found)
            self.sonNEup.query(rank,found)
            self.sonSOup.query(rank,found)
            self.sonSEup.query(rank,found)
            self.sonNOdw.query(rank,found)
            self.sonNEdw.query(rank,found)
            self.sonSOdw.query(rank,found)
            self.sonSEdw.query(rank,found)

    def show(self):
        rect(self.boundary.x,self.boundary.y,self.boundary.z,self.boundary.w*2,self.boundary.h*2,self.boundary.p*2,self.color)
        if(self.divided):
            self.sonNOup.show()
            self.sonNEup.show()
            self.sonSOup.show()
            self.sonSEup.show()
            self.sonNOdw.show()
            self.sonNEdw.show()
            self.sonSOdw.show()
            self.sonSEdw.show()
        for p in self.points:
            dot(p.x,p.y,p.z,self.color)

from random import*


def main():
    boundary = Rectangle (200,200,200,200,200,200)
    ot= Octree(boundary,8)
    for i in range(0,10):
        val1 = randrange(400)
        val2 = randrange(400)
        val3 = randrange(400)
        p = Point(val1,val2,val3)
        ot.insert(p)
    ot.show()
    rank = Rectangle(randrange(200),randrange(200),randrange(200),randrange(100),randrange(100),randrange(100))
    rect(rank.x,rank.y,rank.z,rank.w*3,rank.h*3,rank.p*3,[255,0,0])

    rank_dot= []
    ot.query(rank,rank_dot)
    for it in rank_dot:
        dot(it.x,it.y,it.z,[255,0,0])
    print(rank_dot)
    screen()



main()


