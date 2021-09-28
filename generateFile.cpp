#include <bits/stdc++.h>

using namespace std;

void llenar(int n){
    srand(time(0));
    ofstream file("in.txt");
    for (int i=0;i<n;i++){
        file<<rand()%n+1<<" ";
    }
    file.close();
}


int main()
{
    int val;
    cin>>val;
    llenar(val);
    return 0;
}
