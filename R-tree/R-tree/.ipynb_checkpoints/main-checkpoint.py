from R_tree import RTree
from Node import Node
from Object import Rect,Point
import random
import matplotlib.pyplot as plt

def main():
    tree=RTree(2)

    for i in range(15):
        tree.insert(Point(random.randint(0,50),random.randint(0,50),random.randint(0,50)))

    tree.show()

    #plt.plot([1,2,3,4])
    #plt.ylabel('some numbers')
    #plt.show()

main()
