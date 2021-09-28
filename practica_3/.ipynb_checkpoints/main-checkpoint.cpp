#include <bits/stdc++.h>

using namespace std;

class Color{
    public:
        int red,green,blue;
        int alpha[];
        Color(int Red=0,int Green=0,int Blue=0,int Alpha[]={}){
            this->red=Red;
            this->green=Green;
            this->blue=Blue;
            this->alpha=Alpha;
        }
};
class OctreeQuantizer;

class OctreeNode{
    public:
        Color color;
        int pixel_count;
        int pallete_index;

        OctreeNode(int level, OctreeQuantizer parent){
            color = Color(0,0,0);
        }

};


int main(){


}
