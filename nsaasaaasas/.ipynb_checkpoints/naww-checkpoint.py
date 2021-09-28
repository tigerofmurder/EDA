import matplotlib
import numpy as np
import matplotlib.pyplot as plt

import time
from random import choice

import sys
sys.path
sys.path.append('/home/tigerofmurder/CURSOS/EDA/nsaasaaasas/')
print (sys.path)

x4,y4 = np.loadtxt('merge.txt',delimiter=' ',unpack=True)
jx4,jy4 = np.loadtxt('Intercala.txt',delimiter=' ',unpack=True)

plt.plot(x4, y4, color="green", label="mergeSort-C++")
plt.plot(jx4, jy4, color="blue", label="mergeSort-java")


plt.xlabel("n")
plt.ylabel("Time(ms)")
plt.legend()
