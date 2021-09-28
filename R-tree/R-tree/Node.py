from Object import Rect,Point
from graphviz import Digraph

class Node:
    def __init__(self,B):
        self.B = B
        #self.id = 0
        self.child_nodes = []
        self.points = []
        self.parent_node = None
        self.MBR = Rect(-1,-1,-1,-1)

    def getObject(self):
        return self.points if self.is_leaf() else self.MBR

    def show(self,dot):
        if(self.is_leaf()):
            v=[]
            for point in self.points:
                v.append(str(point))
            dot.node(str(self),str(v))
            return v
        else:
            dot.node(str(self),str(self.MBR))
            for child in self.child_nodes:
                data=child.show(dot)
                dot.edge(str(self),str(child))
                
            return self.MBR

    def get_parent(self):
        return self.parent_node

    def insert_point(self,point):
        self.points.append(point)

    def is_leaf(self):
        return len(self.child_nodes) == 0

    def is_overflow(self):
        return (self.is_leaf() and len(self.points) > self.B ) or \
                (not self.is_leaf() and len(self.child_nodes) > self.B)

    def insert_child_node(self,node):
        node.parent_node=self
        self.child_nodes.append(node)

    def updateMBR(self):
        if(self.is_leaf()):
            datax=[point.x for point in self.points]
            datay=[point.y for point in self.points]
            self.MBR.x1=min(datax)
            self.MBR.x2=max(datax)
            self.MBR.y1=min(datay)
            self.MBR.y2=max(datay)

        else:
            datax=[child.MBR.x1 for child in self.child_nodes]
            datax1=[child.MBR.x2 for child in self.child_nodes]
            datay=[child.MBR.y1 for child in self.child_nodes]
            datay1=[child.MBR.y2 for child in self.child_nodes]
            self.MBR.x1=min(datax)
            self.MBR.x2=max(datax1)
            self.MBR.y1=min(datay)
            self.MBR.y2=max(datay1)

        if( self.parent_node and not self.parent_node.MBR.contain_rect(self.MBR)):
            self.parent_node.updateMBR()

    def get_pointsMBR_perimeter(self,points):
        x1=min([point.x for point in points ])
        x2=max([point.x for point in points ])
        y1=min([point.y for point in points ])
        y2=min([point.y for point in points ])
        return Rect(x1,y1,x2,y2).perimeter()

    def get_nodesMBR_perimeter(self,nodes):

        x1=min([node.MBR.x1 for node in nodes ])
        x2=max([node.MBR.x2 for node in nodes ])
        y1=min([node.MBR.y1 for node in nodes ])
        y2=max([node.MBR.y2 for node in nodes ])
        return Rect(x1,x2,y1,y2).perimeter()

    def perimeter(self):
        return self.MBR.perimeter()

    def perimeter_increase_with_point(self,point):
        x1=point.x if point.x < self.MBR.x1 else self.MBR.x1
        y1=point.y if point.y < self.MBR.y1 else self.MBR.y1
        x2=point.x if point.x > self.MBR.x2 else self.MBR.x2
        y2=point.y if point.y > self.MBR.y2 else self.MBR.y2
        return Rect(x1,y1,x2,y2).perimeter()-self.perimeter()
