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
        vector<vector<int>> children(8);

        OctreeNode(int level, OctreeQuantizer parent){
            color = Color(0,0,0);
            pixel_count = 0;
            palette_index = 0;
            for (int i=0;i<8;i++)
                children[i].clear();
            if (level < OctreeQuatizer.MAX_DEPTH -1)
                parent.add_level_node(level)
        }
        bool is_leaf(){
            return this->pixel_count > 0;
        }
        
        auto get_leaf_nodes(){
            vector<int> leaf_node;
            for (int i=0;i<8;i++){
                auto node = this->children[i];
                if node{
                    if node.is_leaf()
                        leaf_nodes.push_back(node);
                    else
                        leaf_nodes.
                }
            }
        }

};


int main(){


}
