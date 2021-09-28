#include <bits/stdc++.h>
#include <algorithm>

#include <thread>
#include <chrono>
using namespace std;
using namespace std::chrono;


using namespace std;

void swap(int *xp, int *yp){
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void bubbleSort(vector<int> &arr) {
   int n=arr.size();
   for (int i = 0; i < n-1; i++){
     for (int j = 0; j < n-i-1; j++){
        if (arr[j] > arr[j+1]){
           swap(&arr[j], &arr[j+1]);
        }
     }
   }
}

void countSort(vector <int>& arr)
{
    int max = *max_element(arr.begin(), arr.end());
    int min = *min_element(arr.begin(), arr.end());
    int range = max - min + 1;

    vector<int> count(range), output(arr.size());
    for(int i = 0; i < arr.size(); i++)
        count[arr[i]-min]++;

    for(int i = 1; i < count.size(); i++)
           count[i] += count[i-1];

    for(int i = arr.size()-1; i >= 0; i--)
    {
         output[ count[arr[i]-min] -1 ] = arr[i];
              count[arr[i]-min]--;
    }

    for(int i=0; i < arr.size(); i++)
            arr[i] = output[i];
}

void heapify(vector<int>&arr, int n, int i){
    int largest = i;
    int l = 2*i + 1;
    int r = 2*i + 2;
    if (l < n && arr[l] > arr[largest])
        largest = l;
    if (r < n && arr[r] > arr[largest])
        largest = r;
    if (largest != i){
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>&arr){
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    for (int i=n-1; i>=0; i--){
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}



void insertionSort(vector<int> &vect){
    for (int i=1;i<vect.size();i++){
        int aux=vect[i];
        int j = i-1;
        while (j>=0 and vect[j]>aux){
            vect[j+1]=vect[j];
            j=j-1;
        }
        vect[j+1]=aux;
    }
}

void merge(vector<int>&arr, int l, int m, int r){
    int i, j, k;
    int n1 = m - l + 1;
    int n2 =  r - m;
    int L[n1], R[n2];
    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1+ j];

    i=j=0;
    k=l;
    while (i < n1 && j < n2){
        if (L[i] <= R[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1){
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2){
        arr[k] = R[j];
        j++;
        k++;
    }
}

void imergeSort(vector<int>&arr, int l, int r){
    if (l < r){
        int m = l+(r-l)/2;
        imergeSort(arr, l, m);
        imergeSort(arr, m+1, r);
        merge(arr, l, m, r);
    }
}

void mergeSort(vector<int> &arr){
    imergeSort(arr,0,arr.size()-1);
}

int partition (vector<int>&arr, int low, int high){
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++){
        if (arr[j] < pivot){
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void iquickSort(vector<int> &arr,int l, int h){
    if(l<h){
        int pi = partition(arr,l,h);
        iquickSort(arr,l,pi-1);
        iquickSort(arr,pi+1,h);
    }
}
void quickSort(vector<int> &arr){
    iquickSort(arr,0,arr.size()-1);
}

void selectionSort(vector<int>&arr){
    int min_idx;
    for (int i = 0; i <arr.size()-1; i++){
        min_idx = i;
        for (int j = i+1; j < arr.size(); j++)
        if (arr[j] < arr[min_idx]){
            min_idx = j;
        }
        swap(&arr[min_idx], &arr[i]);
    }
}

pair<vector<int>,vector<double>> tryItBunch(auto fun, int startN=10, int endN=100, int stepSize=10, int numTrials=20, int listMax=10){
    vector<int> nValues;
    vector<double> tValues;
    for(int n=startN;n<endN;n+=stepSize){
        double runtime;
        for(int t=0;t<numTrials;t++){
            vector<int> lst(n);//vector<int> lst(10000)
            auto f = []() -> int { return rand() % 10000; };
            generate(lst.begin(),lst.end(), f);
            auto start = high_resolution_clock::now();
            fun(lst);
            auto stop = high_resolution_clock::now();

            auto elapsed = duration_cast<milliseconds>(stop - start);

            runtime = runtime + elapsed.count();
        }
        runtime = runtime / numTrials;
        nValues.push_back(n);
        tValues.push_back(runtime);
    }
    return make_pair(nValues,tValues);
}

void getFile(string name,pair<vector<int>,vector<double>> aa){
    ofstream file(name+".txt");
    vector<double>::iterator ite=aa.second.begin();
    for(auto it:aa.first){
        file<<it<<","<<*(ite)<<endl;
        *(ite)++;
    }
    file.close();
}

int main()
{

/*

    string input_str;
    vector<int> vect;
    vector<int> vect1;
    vector<int> vect2;
    vector<int> vect3;
    vector<int> vect4;
    vector<int> vect5;
    vector<int> vect6;
    vector<int> vect7;
    cout<<"file: ";
    getline(cin,input_str);
    stringstream ss(input_str);
    int it;
    while (ss >> it){
        vect.push_back(it);
        if (ss.peek() == ' ')
            ss.ignore();
    }

    mergeSort(vect);
    for(auto i:vect){
    	cout<<i<<" ";
    }
    cout<<endl;


    thread first(bubbleSort
    ,vect);
    first.join();
    //std::thread second(bar,0);
*/
    pair<vector<int>,vector<double>> aa=tryItBunch(bubbleSort,50,10000,1000,20,10);
    getFile("bubble",aa);
    cout<<"buuble"<<endl;
    pair<vector<int>,vector<double>> aa1=tryItBunch(countSort,50,1000000,500,1,10000);
    getFile("counting",aa1);
    pair<vector<int>,vector<double>> aa2=tryItBunch(heapSort,50,1000000,500,1,10000);
    getFile("heap",aa2);
    pair<vector<int>,vector<double>> aa3=tryItBunch(insertionSort,50,1000000,500,1,10000);
    getFile("insertion",aa3);
    pair<vector<int>,vector<double>> aa4=tryItBunch(mergeSort,50,1000000,500,1,10000);
    getFile("merge",aa4);
    pair<vector<int>,vector<double>> aa5=tryItBunch(quickSort,50,1000000,500,1,10000);
    getFile("quick",aa5);
    pair<vector<int>,vector<double>> aa6=tryItBunch(selectionSort,50,1000000,500,1,10000);
    getFile("selection",aa6);






/*



    vect1=vect2=vect3=vect4=vect5=vect6=vect7=vect;

    bubbleSort(vect);

    countSort(vect1);

    heapSort(vect2);

    insertionSort(vect3);

    mergeSort(vect4);

    quickSort(vect5);

    selectionSort(vect6);

    for(auto i:vect7){
    	cout<<i<<" ";
    }
    cout<<endl;


    for(auto i:vect){
    	cout<<i<<" ";
    }
    cout<<endl;

    for(auto i:vect1){
    	cout<<i<<" ";
    }
    cout<<endl;
    for(auto i:vect2){
    	cout<<i<<" ";
    }
    cout<<endl;
    for(auto i:vect3){
    	cout<<i<<" ";
    }
    cout<<endl;
    for(auto i:vect4){
    	cout<<i<<" ";
    }
    cout<<endl;
    for(auto i:vect5){
    	cout<<i<<" ";
    }
    cout<<endl;
    for(auto i:vect6){
    	cout<<i<<" ";
    }
    cout<<endl;

    return 0;*/
}
