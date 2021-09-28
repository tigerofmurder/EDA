import java.util.*;
import java.util.Random;
import java.util.Scanner;
import java.io.*;

class MergeSort{
    static void merge(int arr[], int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        int L[] = new int [n1];
        int R[] = new int [n2];

        for (int i=0; i<n1; ++i)
            L[i] = arr[l + i];
        for (int j=0; j<n2; ++j)
            R[j] = arr[m + 1+ j];


        int i = 0, j = 0;

        int k = l;
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

    static void sort(int arr[], int l, int r){
        if (l < r){
            int m = (l+r)/2;

            sort(arr, l, m);
            sort(arr , m+1, r);

            merge(arr, l, m, r);
        }
    }

    static void printArray(int arr[]){
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    public static void main(String args[]){

        tryItBunch("MergeSort",50,10000,500,1,500);

        /*String input;
    	Scanner scanIn = new Scanner(System.in);
        input = scanIn.nextLine();

       	scanIn.close();

	Scanner s = new Scanner(input).useDelimiter("\\s* \\s*");

	int arr[] = new int[10000];
	int i=0;
	while(s.hasNext()){
		arr[i]=s.nextInt();
		i++;
	}

        MergeSort ob = new MergeSort();
        ob.sort(arr, 0, arr.length-1);

        printArray(arr);*/
    }
    static void tryItBunch(String name, int startN, int endN, int stepSize, int numTrials, int listMax){
    	try{
	    OutputStream myFile = new FileOutputStream(name+".txt");
	    PrintStream File = new PrintStream(myFile);

	    for(int n=startN;n<endN;n+=stepSize){
		double runtime=0.0;
		for(int t=0;t<numTrials;t++){
		    Random rnd = new Random();
		    int[] lst = new int[n];
		    for (int i = 0; i < n; i++) {
		      lst[i] = (int)(rnd.nextDouble() * 10000 + 0);
		    }

		    long timeStart, timeEnd;
		    timeStart = System.currentTimeMillis();

		    sort(lst,0,n-1);

		    timeEnd = System.currentTimeMillis();

		    double elapsed = (timeEnd - timeStart);

		    runtime += elapsed;
		}
		runtime = runtime / numTrials;
		File.println(n+" "+runtime);
	    }
	    myFile.close();
	}catch (Exception E){
		System.out.println("");
	}
    }
}

