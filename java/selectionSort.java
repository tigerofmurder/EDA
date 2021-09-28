import java.util.*;
import java.util.Random;
import java.util.Scanner;
import java.io.*;

class SelectionSort {
    static void sort(int arr[]){
        int n = arr.length;
        for (int i = 0; i < n-1; i++){
	    int min_idx = i;
            for (int j = i+1; j < n; j++)
                if (arr[j] < arr[min_idx])
                    min_idx = j;
	    int temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }

    void printArray(int arr[]){
        int n = arr.length;
        for (int i=0; i<n; ++i)
            System.out.print(arr[i]+" ");
        System.out.println();
    }

    public static void main(String args[]){

	tryItBunch("SelectionSort",50,10000,500,1,500);

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

        SelectionSort ob = new SelectionSort();

	ob.sort(arr);

        ob.printArray(arr);*/
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

