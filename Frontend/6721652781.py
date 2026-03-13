
import pandas as pd
from matplotlib import pyplot as plt
import numpy as np
X= np.array([1,2,3,4,5])
y= np.array([2.0,2.8,3.6,4.5,5.1])
plt.plot(X,y,marker=".")
plt.xlabel("X")
plt.ylabel("Y")
plt.grid(True)
plt.show()


