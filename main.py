%matplotlib inline
import matplotlib
import numpy as np
import matplotlib.pyplot as plt

import time
from random import choice

import sys
sys.path
sys.path.append('/home/tigerofmurder/cursos/EDA/')
sys.path.append('/home/tigerofmurder/cursos/EDA/java/')
print (sys.path)


def bubbleSort(arr): 
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1] : 
                arr[j], arr[j+1] = arr[j+1], arr[j]


def countingSort(tlist, k):
    count_list = [0]*(k)
    for n in tlist:
        count_list[n] = count_list[n] + 1
    i=0
    for n in range(len(count_list)):
        while count_list[n] > 0:
            tlist[i] = n
            i+=1
            count_list[n] -= 1
            
def countSort(arr):
    countingSort(arr, max(arr)+1)
                


def heapify(arr, n, i): 
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2
    if l < n and arr[i] < arr[l]: 
        largest = l
    if r < n and arr[largest] < arr[r]: 
        largest = r
    if largest != i: 
        arr[i],arr[largest] = arr[largest],arr[i]
        heapify(arr, n, largest) 

def heapSort(arr): 
    n = len(arr) 
    for i in range(n, -1, -1): 
        heapify(arr, n, i)
    for i in range(n-1, 0, -1): 
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0) 




def insertionSort(arr): 
    for i in range(1, len(arr)): 
        key = arr[i]
        j = i-1
        while j >= 0 and key < arr[j] : 
                arr[j + 1] = arr[j] 
                j -= 1
        arr[j + 1] = key 



def mergeSort(arr): 
    if len(arr) >1: 
        mid = len(arr)//2
        L = arr[:mid]
        R = arr[mid:]
  
        mergeSort(L)
        mergeSort(R)
  
        i = j = k = 0
        while i < len(L) and j < len(R): 
            if L[i] < R[j]: 
                arr[k] = L[i] 
                i+=1
            else: 
                arr[k] = R[j] 
                j+=1
            k+=1
        while i < len(L): 
            arr[k] = L[i] 
            i+=1
            k+=1
          
        while j < len(R): 
            arr[k] = R[j] 
            j+=1
            k+=1


def partition(arr,low,high): 
    i = ( low-1 )
    pivot = arr[high]
    for j in range(low , high):
        if   arr[j] < pivot:
            i = i+1 
            arr[i],arr[j] = arr[j],arr[i] 
    arr[i+1],arr[high] = arr[high],arr[i+1] 
    return ( i+1 ) 
  
def iquickSort(arr,low,high): 
    if low < high: 
        pi = partition(arr,low,high)
        iquickSort(arr, low, pi-1) 
        iquickSort(arr, pi+1, high) 


def selectionSort(A):
    for i in range(len(A)): 
        min_idx = i 
        for j in range(i+1, len(A)): 
            if A[min_idx] > A[j]: 
                min_idx = j 
        A[i], A[min_idx] = A[min_idx], A[i]







