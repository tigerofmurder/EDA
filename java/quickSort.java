import java.util.*;
import java.util.Random;
import java.util.Scanner;
import java.io.*;


class QuickSort{
    static int partition(int arr[], int low, int high){
        int pivot = arr[high];
        int i = (low-1);
        for (int j=low; j<high; j++){
            if (arr[j] < pivot){
                i++;

                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i+1];
        arr[i+1] = arr[high];
        arr[high] = temp;

        return i+1;
    }


    static void sort(int arr[], int low, int high){
        if (low < high){
            int pi = partition(arr, low, high);

            sort(arr, low, pi-1);
            sort(arr, pi+1, high);
        }
    }

    static void printArray(int arr[]){
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i]+" ");
        System.out.println();
    }

    public static void main(String args[]){
	tryItBunch("QuickSort",50,10000,500,1,500);

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

        int n = arr.length;

        QuickSort ob = new QuickSort();
        ob.sort(arr, 0, n-1);

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

