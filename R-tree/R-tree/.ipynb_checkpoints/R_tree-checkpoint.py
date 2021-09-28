from Node import Node
from Object import Rect,Point
from graphviz import Digraph
import math

class RTree:
    def __init__(self, B=4):
        self.B = B
        self.root = Node(self.B) 

    def insert(self,point,node=None):
        if(node is None):
            node = self.root

        if(node.is_leaf()):
            node.insert_point(point)
            #node.updateMBR()
            if (node.is_overflow()):
                self.handle_overflow(node)

        else:
            node_v=self.choose_subtree(node,point)
            self.insert(point,node_v)

    def handle_overflow(self,node):
        #split
        node,new_node = self.split_leaf_node(node) if node.is_leaf() else self.split_internal_node(node)

        if (node is self.root) :
            self.root = Node(self.B)
            self.root.insert_child_node(node)
            self.root.insert_child_node(new_node)
            self.root.updateMBR()
        else:
            
            w_node=node.get_parent()
            node.updateMBR()
            w_node.insert_child_node(new_node)
            #w_node.updateMBR()
            if(w_node.is_overflow()):
                    self.handle_overflow(w_node)


    def choose_subtree(self,node,point):
        best_child=None
        best_perimeter = 0

        for item in node.child_nodes:
            if( node.child_nodes.index(item) == 0 or \
                best_perimeter > item.perimeter_increase_with_point(point)):
                best_child=item
                best_perimeter=item.perimeter_increase_with_point(point)
        return best_child

    def split_leaf_node(self,node):
        m = len(node.points)
        best_perimeter = -1
        best_set1 = []
        best_set2 = []
        pointsortx=sorted(node.points, key=lambda point: point.x)
        for i in range(int(0.4*m),int(0.6*m)+1):
            S1=pointsortx[:i]
            S2=pointsortx[i:]
            tempP = node.get_pointsMBR_perimeter(S1)\
                    +node.get_pointsMBR_perimeter(S2)
            if( best_perimeter == -1 or best_perimeter > tempP):
                best_perimeter = tempP
                best_set1=S1
                best_set2=S2

        pointsorty=sorted(node.points, key=lambda point: point.y)
        
        for i in range(int(0.4*m),int(0.6*m)+1):
            S1=pointsorty[:i]
            S2=pointsorty[i:]
            tempP=node.get_pointsMBR_perimeter(S1)\
                    +node.get_pointsMBR_perimeter(S2)
            if( best_perimeter == -1 or best_perimeter > tempP):
                best_perimeter = tempP
                best_set1=S1
                best_set2=S2
        
        node.points=best_set1
        node.updateMBR()
        new_node=Node(self.B)
        for pointt in best_set2:
            new_node.insert_point(pointt)
        new_node.updateMBR()
        return node,new_node
        
    def split_internal_node(self,node):
        m = len(node.child_nodes)
        best_perimeter = -1
        best_set1 = []
        best_set2 = []
        pointsortx1=sorted(node.child_nodes, key=lambda child: child.MBR.x1)
        for i in range(int(0.4*m),int(0.6*m)+1):
        
            S1=pointsortx1[:i]
            S2=pointsortx1[i:]
            tempP = node.get_nodesMBR_perimeter(S1)\
                    +node.get_nodesMBR_perimeter(S2)
            if( best_perimeter == -1 or best_perimeter > tempP):
                best_perimeter = tempP
                best_set1=S1
                best_set2=S2
        
        pointsortx2=sorted(node.child_nodes, key=lambda child: child.MBR.x2)
        for i in range(int(0.4*m),int(0.6*m)+1):
        
            S1=pointsortx2[:i]
            S2=pointsortx2[i:]
            tempP = node.get_nodesMBR_perimeter(S1)\
                    +node.get_nodesMBR_perimeter(S2)
            if( best_perimeter == -1 or best_perimeter > tempP):
                best_perimeter = tempP
                best_set1=S1
                best_set2=S2

        pointsorty1=sorted(node.child_nodes, key=lambda child: child.MBR.y1)
        for i in range(int(0.4*m),int(0.6*m)+1):
            S1=pointsorty1[:i]
            S2=pointsorty1[i:]
            tempP=node.get_nodesMBR_perimeter(S1)\
                    +node.get_nodesMBR_perimeter(S2)
            if( best_perimeter == -1 or best_perimeter > tempP):
                best_perimeter = tempP
                best_set1=S1
                best_set2=S2
        pointsorty2=sorted(node.child_nodes, key=lambda child: child.MBR.y2)
        
        for i in range(int(0.4*m),int(0.6*m)+1):
            S1=pointsorty2[:i]
            S2=pointsorty2[i:]
            tempP=node.get_nodesMBR_perimeter(S1)\
                    +node.get_nodesMBR_perimeter(S2)
            if( best_perimeter == -1 or best_perimeter > tempP):
                best_perimeter = tempP
                best_set1=S1
                best_set2=S2
        
        node.child_nodes =best_set1
        node.updateMBR()
        new_node=Node(self.B)
        for pointt in best_set2:
            new_node.insert_child_node(pointt)
        new_node.updateMBR()
        return node,new_node

    def range_query(self,region,node=None):
        if node is None:
            node=self.root

        if(node.is_leaf()):
            points=[]
            for point in node.points:
                if(region.is_covered(point)):
                    points.append(point)
            return points

        else:
            points=[]
            for child in node.child_nodes:
                if( region.intersect(child.MBR)):
                    points+=range_query(region,child)

            return points

    def show(self):
        dot=Digraph()
        self.root.show(dot)
        #print(dot.source)
        dot.render('R-tree.gv',view=True)
   
  
