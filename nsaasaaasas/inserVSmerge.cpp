#include <iostream>
#include <vector>
#include <time.h>
#include <fstream>
#include <cstdio>
using namespace std;

typedef int num;
typedef double real;
typedef vector<num> myvector;

///Algoritmo Insert Sort (CRECIENTE)
void insertsort(myvector A){
    for (num i=1;i<A.size();i++){
        num val=A[i];
        num j=i-1;
        while(j>=0 && A[j]>val){
            A[j+1]=A[j];
            j--;
        }
    A[j+1]=val;
    }
}
//////////////////////////////////




/////////////////////////////////////////

void merge(myvector &aVector, int size, int low, int middle, int high){
    int temp[size];
    for(int i = low; i <= high; i++){
        temp[i] = aVector[i];
    }
    int i = low;
    int j = middle+1;
    int k = low;

    while (i <= middle && j <= high){
        if(temp[i] <= temp[j]){
            aVector[k] = temp[i];
            ++i;
        }
        else {
            aVector[k] = temp[j];
            ++j;
        }
        ++k;
    }
    while (i <= middle){
        aVector[k] = temp[i];
        ++k;
        ++i;
    }
}

void mergeSort(myvector &aVector, int size, int low, int high){
    if (low < high){
        int middle = (low + high) / 2;
        mergeSort(aVector, size, low, middle);
        //cout<<"middle= "<<middle<<"low= "<<low<<"hish = "<<high<<endl;
        mergeSort(aVector, size, middle+1, high);
        //cout<<"middle= "<<middle<<"low= "<<low<<"hish = "<<high<<endl;
        merge(aVector, size, low, middle, high);
    }
    //mostrar(aVector);
}

int main (){
	ifstream input;
	ofstream setData;
    input.open("datos.txt");
    string letra;

    int tamano=0,X=0;
    clock_t TMerge,TInsert;
    setData.open("mergesecond.txt");
    //setData<<"tiempo merge insert"<<endl;
    ofstream Ifile("Insert.txt");
    while(getline(input,letra)){
        myvector valores;
    	string aux;
    	for(int i=0;i<letra.length();i++){
    		if (letra[i]==' '){
    			int val=atoi(letra.c_str());
    			valores.push_back(val);
    		}
    		aux+=letra[i];
    	}

    	TMerge=clock();
    	mergeSort(valores,tamano,0,X);
    	TMerge=clock()-TMerge;

    	TInsert =clock();
    	insertsort(valores);
    	TInsert =clock() - TInsert;
    	setData<<tamano<<" "<<((float)TMerge)/CLOCKS_PER_SEC<<endl;
    	Ifile<<tamano<<" "<<((float)TInsert)/CLOCKS_PER_SEC<<endl;
    	tamano++;
    	X++;
    	if(tamano==1)
    		X--;
    }
    setData.close();


    return 0;
}
