import java.util.*;
import java.util.Random;
import java.util.Scanner;
import java.io.*;

class HeapSort{
    static public void sort(int arr[]){
        int n = arr.length;
	for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
	for (int i=n-1; i>=0; i--){
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
	    heapify(arr, i, 0);
        }
    }

    static void heapify(int arr[], int n, int i){
        int largest = i;
        int l = 2*i + 1;
        int r = 2*i + 2;

	if (l < n && arr[l] > arr[largest])
            largest = l;
	if (r < n && arr[r] > arr[largest])
            largest = r;
	if (largest != i){
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
	    heapify(arr, n, largest);
        }
    }

    static void printArray(int arr[]) {
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i]+" ");
        System.out.println();
    }

    public static void main(String args[]){
        tryItBunch("HeapSort",50,10000,500,1,500);

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

        HeapSort ob = new HeapSort();
        ob.sort(arr);

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

		    sort(lst);

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

