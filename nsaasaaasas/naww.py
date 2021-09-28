import numpy as np
import matplotlib.pyplot as plt


x4,y4 = np.loadtxt('comparacion.csv',delimiter=' ',unpack=True)
jx4,jy4 = np.loadtxt('Intercala.txt',delimiter=' ',unpack=True)

plt.plot(x4, y4, color="green", label="merge")
plt.plot(jx4, jy4, color="blue", label="Intercala")

plt.axis("on")
plt.xlabel("n")
plt.ylabel("Time(ms)")
plt.legend()
