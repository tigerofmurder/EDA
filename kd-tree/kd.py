from random import*
import vtk
from collections import defaultdict
from collections import deque
import networkx as nx
from networkx.drawing.nx_agraph import graphviz_layout
import matplotlib.pyplot as plt
import time


###################       variables globales  ###############################


levels = defaultdict(list)
Grafo = nx.DiGraph()



###################       construccion grafo tree  ###############################

def hierarchy_pos(G, root=None, width=1., vert_gap = 0.2, vert_loc = 0, xcenter = 0.5):
    if not nx.is_tree(G):
        raise TypeError('cannot use hierarchy_pos on a graph that is not a tree')

    if root is None:
        if isinstance(G, nx.DiGraph):
            root = next(iter(nx.topological_sort(G)))  #allows back compatibility with nx version 1.11
        else:
            root = random.choice(list(G.nodes))

    def _hierarchy_pos(G, root, width=1., vert_gap = 0.2, vert_loc = 0, xcenter = 0.5, pos = None, parent = None):

        if pos is None:
            pos = {root:(xcenter,vert_loc)}
        else:
            pos[root] = (xcenter, vert_loc)
        children = list(G.neighbors(root))
        if not isinstance(G, nx.DiGraph) and parent is not None:
            children.remove(parent)  
        if len(children)!=0:
            dx = width/len(children) 
            nextx = xcenter - width/2 - dx/2
            for child in children:
                nextx += dx
                pos = _hierarchy_pos(G,child, width = dx, vert_gap = vert_gap, 
                                    vert_loc = vert_loc-vert_gap, xcenter=nextx,
                                    pos=pos, parent = root)
        return pos


    return _hierarchy_pos(G, root, width, vert_gap, vert_loc, xcenter)



###################         k-d tree        #################################

class Node:
    def __init__(self,point,axis):
        self.point = point
        self.left = None
        self.right = None
        self.axis = axis

def build_kdtree(points, depth = 0):
    if not points:
        return

    k = len(points[0])
    axis = depth % k

    points.sort(key=lambda x:x[axis])
    median = len(points)//2
    
    node = Node(points[median],axis)
    node.left = build_kdtree(points[0:median], depth+1)
    node.right = build_kdtree(points[median+1:], depth+1)
    return node


def generate_graph(node):
    if node.left!=None:
        str1 = ','.join(str(e) for e in node.point)
        str2 = ','.join(str(e) for e in node.left.point)
        Grafo.add_edge(str1,str2)
        generate_graph(node.left)
    if node.right!=None:
        str1 = ','.join(str(e) for e in node.point)
        str2 = ','.join(str(e) for e in node.right.point)
        Grafo.add_edge(str1,str2)
        generate_graph(node.right)

        
def arbol_levels(node):
    if node == None:
        return
    cola = deque()
    cola.append(node)
    nvl = 0
    while cola:
        nodeCount = len(cola)
        while nodeCount > 0:
            tmp = cola[0]
            dot(tmp.point)
            levels[nvl].append(tmp)
            print(tmp.point,end="\t")
            cola.popleft()
            if(tmp.left!=None):
                cola.append(tmp.left)
            if(tmp.right!=None):
                cola.append(tmp.right)
            nodeCount-=1
        print("\n")
        nvl+=1


        

################     VTK       ######################

dots=[]
actors=[]

def rect(x,y,z,w,h,p):
    cube=vtk.vtkCubeSource()
    cube.SetXLength(w)
    cube.SetYLength(h)
    cube.SetZLength(p)
    cube.SetCenter(x,y,z)
    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())
    cubeActor=vtk.vtkActor()
    cubeActor.GetProperty().SetColor(255,255,0)
    cubeActor.GetProperty().SetOpacity(0.2)
    cubeActor.SetMapper(cubeMapper)
    actors.append(cubeActor)

def dot(point):
    cube=vtk.vtkSphereSource()
    cube.SetRadius(3.5)
    if len(point) == 2:
        cube.SetCenter(point[0],point[1],0)
    else:
        cube.SetCenter(point[0],point[1],point[2])
    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())
    cubeActor=vtk.vtkActor()
    cubeActor.GetProperty().SetColor(255,0,0)
    cubeActor.SetMapper(cubeMapper)
    dots.append(cubeActor)
    
def line(point):
    cube=vtk.vtkLineSource()
    cube.SetPoint1(point[0],0,point[2])
    cube.SetPoint2(point[0],400,point[2])
    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())
    cubeActor=vtk.vtkActor()
    cubeActor.GetProperty().SetColor(255,0,0)
    cubeActor.SetMapper(cubeMapper)
    dots.append(cubeActor)

def Screen():
    ren = vtk.vtkRenderer()
    ren.AddActor(actors[0])
    for act in dots:
        ren.AddActor(act)
    
    renWin = vtk.vtkRenderWindow()
    renWin.AddRenderer(ren)
    renWin.SetSize(600, 600)
    iren = vtk.vtkRenderWindowInteractor()
    iren.SetRenderWindow(renWin)
    ren.SetBackground(0,0,0)
    renWin.Render()
    time.sleep(5)
    iren.Start()
    
    
################       MAIN             ###############

def main():
    #pointList = [(2,3),(5,4),(9,1),(4,7),(1,2)]
    pointList=[]
    dimensions = 3
    cantidad = 100
    if(dimensions == 3):
        rect (200,200,200,400,400,400)
        for i in range(0,cantidad):
            val1 = randrange(10,400)
            val2 = randrange(10,400)
            val3 = randrange(10,400)
            pointList.append((val1,val2,val3))
    else:  
        rect (200,200,0,400,400,0)
        for i in range(0,10):
            val1 = randrange(10,400)
            val2 = randrange(10,400)
            pointList.append((val1,val2))
    
    tree = build_kdtree(pointList)
    generate_graph(tree)
    line(tree.point)
    arbol_levels(tree)
    str1 = ','.join(str(e) for e in tree.point)
    pos = hierarchy_pos(Grafo,str1)
    nx.draw(Grafo,pos=pos,with_labels=True,font_size = 4,
                    width = 2)
    
    plt.show()

main()
#Screen()
