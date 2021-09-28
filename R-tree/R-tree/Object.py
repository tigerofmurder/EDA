
class Rect:
    def __init__(self,x1,y1,x2,y2):
        self.x1=x1
        self.x2=x2
        self.y1=y1
        self.y2=y2

    def perimeter(self):
        return 2*(abs(self.x2-self.x1)\
                +abs(self.y2-self.y1))

    def contain_rect(self,rect):
        return self.x1<rect.x1 and self.y1<rect.y1 and \
                self.x2<rect.x2 and self.y2<rect.y2

    def __str__(self):
        return "Rect: ({}, {}), ({}, {})".format(self.x1, self.y1, self.x2, self.y2)

    def intersect(self,rect):
        if (self.y1>rect.y2 or self.y2<rect.y1 or\
                self.x1>rect.x2 or self.x2<rect.x1):
            return False
        return True

    def is_covered(self,point):
        return self.x1<=point.x<=self.x2 and self.y1<=point.y<=self.y2

class Point:
    def __init__(self,id1,x,y):
        self.id=id1
        self.x=x
        self.y=y

    def __str__(self):
        return "Point: ({} ,{}, {})".format(self.id, self.x, self.y)
