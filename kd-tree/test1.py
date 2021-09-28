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


################     VTK       ######################

dots=[]
actors=[]
lineasf = []
lista = []

def cubo(x,y,z,w,h,p,axis):
    cube=vtk.vtkCubeSource()
    cube.SetXLength(w)
    cube.SetYLength(h)
    cube.SetZLength(p)
    cube.SetCenter(x,y,z)
    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())
    cubeActor=vtk.vtkActor()
    if(axis==2):
        cubeActor.GetProperty().SetColor(0,0,255)
    if(axis==1):
        cubeActor.GetProperty().SetColor(0,255,0)
    if(axis==0):
        cubeActor.GetProperty().SetColor(255,0,0)
    cubeActor.GetProperty().SetOpacity(0.8)
    cubeActor.SetMapper(cubeMapper)
    lineasf.append(cubeActor)

def rect(x,y,z,w,h,p):
    cube=vtk.vtkCubeSource()
    cube.SetXLength(w)
    cube.SetYLength(h)
    cube.SetZLength(p)
    cube.SetCenter(x,y,z)
    cubeMapper=vtk.vtkPolyDataMapper()
    cubeMapper.SetInputConnection(cube.GetOutputPort())
    cubeActor=vtk.vtkActor()
    #cubeActor.GetProperty().SetColor(243,195,2)
    cubeActor.GetProperty().SetOpacity(0.2)
    cubeActor.SetMapper(cubeMapper)
    actors.append(cubeActor)

def dot(point):
    sphere=vtk.vtkSphereSource()
    sphere.SetRadius(3.5)
    if len(point) == 2:
        sphere.SetCenter(point[0],point[1],0)
    else:
        sphere.SetCenter(point[0],point[1],point[2])
    sphereMapper=vtk.vtkPolyDataMapper()
    sphereMapper.SetInputConnection(sphere.GetOutputPort())
    sphereActor=vtk.vtkActor()
    sphereActor.GetProperty().SetColor(255,255,0)
    sphereActor.SetMapper(sphereMapper)
    dots.append(sphereActor)

def line(x,y,altura=400,region='X'):
    cube=vtk.vtkLineSource()
    cubeActor=vtk.vtkActor()
    if(region=='Y'):
        cube.SetPoint1(x,y,0)
        cube.SetPoint2(altura,y,0)
        cubeMapper=vtk.vtkPolyDataMapper()
        cubeMapper.SetInputConnection(cube.GetOutputPort())
        cubeActor.GetProperty().SetColor(0,0,255)
        cubeActor.SetMapper(cubeMapper)
    else:
        cube.SetPoint1(x,y,0)
        cube.SetPoint2(x,altura,0)
        cubeMapper=vtk.vtkPolyDataMapper()
        cubeMapper.SetInputConnection(cube.GetOutputPort())
        cubeActor.GetProperty().SetColor(255,0,0)
        cubeActor.SetMapper(cubeMapper)
    lineasf.append(cubeActor)




def left_min(node, tmp, i):
    if(node!=None):
        if(node.point[i]<=tmp.point[i] and node.axis == i):
            return node
        return left_min(node.parent,tmp,i)
    return None
def right_min(node, tmp, i):
    if(node!=None):
        if(node.point[i]>=tmp.point[i] and node.axis == i):
            return node
        return right_min(node.parent,tmp,i)
        #return node
    return None

def construccion_lines():
    for i in levels:
        for j in levels[i]:
            if (j.axis == 0):
                if(j.parent!=None):
                    if(j.parent.point[1]>=j.point[1]):
                        line(j.point[0],0,j.parent.point[1],'X')
                    else:
                        line(j.point[0],400,j.parent.point[1],'X')
                else:
                    line(j.point[0],0)
            else:
                if(j.parent!=None):
                    if(j.parent.point[0]>=j.point[0]):
                        node_aux = left_min(j.parent,j,0)
                        if(node_aux==None):
                            line(0,j.point[1],j.parent.point[0],'Y')
                        else:
                            print(j.point,"\t",node_aux.point)
                            line(node_aux.point[0],j.point[1],j.parent.point[0],'Y')
                    else:
                        node_aux = right_min(j.parent,j,0)
                        if(node_aux==None):
                            line(400,j.point[1],j.parent.point[0],'Y')
                        else:
                            print(j.point,"\t",node_aux.point)
                            line(node_aux.point[0],j.point[1],j.parent.point[0],'Y')
                else:
                    line(0,j.point[1],j.parent.point[0],'Y')

def construccion_separator():
    for i in levels:
        for j in levels[i]:
            if(i%2!=0):
                if(j.parent.point[0]>=j.point[0]):
                    node = left_min(j.parent,j,0)
                    if (node != None and node.point[0]<=j.point[0]):
                        line(node.point[0],j.point[1],j.parent.point[0],'Y')
                    else:
                        line(0,j.point[1],j.parent.point[0],'Y')
                else:
                    node = right_min(j.parent,j,0)
                    if (node != None and node.point[0]<=j.point[0]):
                        print(j.parent.point[0],"\t",j.point,"\t",node.point[0])
                        line(j.parent.point[0],j.point[1],node.point[0],'Y')
                    else:
                        line(400,j.point[1],j.parent.point[0],'Y')
            else:
                if(j.parent!=None):
                    if(j.parent.point[1]>=j.point[1]):
                        line(j.point[0],0,j.parent.point[1],'X')
                    else:
                        line(j.point[0],400,j.parent.point[1],'X')
                else:
                    line(j.point[0],0)

def construccion_planes(node,x,w,y,h,z,p,nivel=0):
    if(node==None):
        return None
    else:
        if(nivel==0):
            lista.append([(node.point[0],(y+h)/2,(z+p)/2),(0,abs(h-y),abs(p-z)),nivel])
            construccion_planes(node.left,x,node.point[0],y,h,z,p,1)
            construccion_planes(node.right,node.point[0],w,y,h,z,p,1)
        if(nivel==1):
            lista.append([((x+w)/2,node.point[1],(z+p)/2),(abs(w-x),0,abs(p-z)),nivel])
            construccion_planes(node.left,x,w,y,node.point[1],z,p,2)
            construccion_planes(node.right,x,w,node.point[1],h,z,p,2)
        if(nivel==2):
            lista.append([((x+w)/2,(y+h)/2,node.point[2]),(abs(w-x),abs(h-y),0),nivel])
            construccion_planes(node.left,x,w,y,h,z,node.point[2],0)
            construccion_planes(node.right,x,w,y,h,node.point[2],p,0)


def Screen():
    ren = vtk.vtkRenderer()
    ren.AddActor(actors[0])
    renWin = vtk.vtkRenderWindow()
    renWin.AddRenderer(ren)
    renWin.SetSize(600, 600)
    iren = vtk.vtkRenderWindowInteractor()
    iren.SetRenderWindow(renWin)
    ren.SetBackground(0,0,0)

    for act in dots:
        ren.AddActor(act)
        renWin.AddRenderer(ren)
        iren.SetRenderWindow(renWin)
        renWin.Render()
        #time.sleep(0.3)
    for act in lineasf:
        ren.AddActor(act)
        renWin.AddRenderer(ren)
        iren.SetRenderWindow(renWin)
        renWin.Render()
        time.sleep(1)

    iren.Start()




###################         k-d tree        #################################

class Node:
    def __init__(self,point,axis):
        self.point = point
        self.left = None
        self.right = None
        self.axis = axis
        self.parent = None
    def set_parent(self,node):
        self.parent = node

def build_kdtree(points, depth = 0, nodes=None):
    if not points:
        return

    k = len(points[0])
    axis = depth % k

    points.sort(key=lambda x:x[axis])
    median = len(points)//2

    node = Node(points[median],axis)
    node.set_parent(nodes)
    node.left = build_kdtree(points[0:median], depth+1,node)
    node.right = build_kdtree(points[median+1:], depth+1,node)
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
        return None
    cola = []
    cola.append(node)
    nvl = 0
    while cola:
        nodeCount = len(cola)
        while nodeCount > 0:
            tmp = cola[0]
            dot(tmp.point)
            temp = cola.pop(0)
            levels[nvl].append(tmp)
            print(tmp.point,"\t",tmp.axis,end="\t\t")
            if(tmp.left!=None):
                cola.append(tmp.left)
            if(tmp.right!=None):
                cola.append(tmp.right)
            nodeCount-=1
        print("\n")
        nvl+=1






################       MAIN             ###############

def main():
    #pointList = [(30,60),(20,70),(170,150),(60,120),(130,150),(90,10),(100,190),(135,80)]
    #pointList = [(279,121),(233,203),(367,272),(173,16),(152,326),(370,51),(360,377),(102,73),(250,102),(72,268),(361,57),(382,98),(331,288)]
    pointList=[]
    dimensions = 2
    cantidad = 15
    if(dimensions == 3):
        rect (200,200,200,400,400,400)
        for i in range(0,cantidad):
            val1 = randrange(10,390)
            val2 = randrange(10,390)
            val3 = randrange(10,390)
            pointList.append((val1,val2,val3))
    else:
        rect (200,200,0,400,400,0)
        for i in range(0,cantidad):
            val1 = randrange(10,390)
            val2 = randrange(10,390)
            pointList.append((val1,val2))

    tree = build_kdtree(pointList)
    generate_graph(tree)
    arbol_levels(tree)
    str1 = ','.join(str(e) for e in tree.point)
    pos = hierarchy_pos(Grafo,str1)
    nx.draw(Grafo,pos=pos,with_labels=True,font_size = 15,
                    width = 2)

    plt.show()
    #construccion_separator()
    if(dimensions == 2):
        construccion_lines()
    else:
        construccion_planes(tree,0,400,0,400,0,400)
        print(lista)
        for i in lista:
            cubo(i[0][0],i[0][1],i[0][2],i[1][0],i[1][1],i[1][2],i[2])
    #print(tree.left.point,"\t",tree.right.point)

main()
Screen()

