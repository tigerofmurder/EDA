import java.util.*;
import java.util.Random;
import java.util.Scanner;
import java.io.*;

class BubbleSort{
static void bubbleSort(int arr[], int n){
	int i, j, temp;
	boolean swapped;
	for (i = 0; i < n - 1; i++){
	    swapped = false;
	    for (j = 0; j < n - i - 1; j++){
		if (arr[j] > arr[j + 1]){
		    temp = arr[j];
		    arr[j] = arr[j + 1];
		    arr[j + 1] = temp;
		    swapped = true;
		}
	    }

	    if (swapped == false)
		break;
	}
}

    static void printArray(int arr[], int size){
        int i;
        for (i = 0; i < size; i++)
            System.out.print(arr[i] + " ");
        System.out.println();
    }

    public static void main(String args[]){

    	tryItBunch("BubbleSort",50,10000,500,1,500);

    	/*

	String input;
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
        bubbleSort(arr, n);
        printArray(arr, n);*/
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

		    bubbleSort(lst,n);

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

