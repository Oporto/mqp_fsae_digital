import time
import sys
from MPU9250 import MPU9250

mpu9250 = MPU9250()

try:
    while True:
        accel = mpu9250.readAccel()
        print(" ax = " , ( accel['x'] ))
        print(" ay = " , ( accel['y'] ))
        print(" az = " , ( accel['z'] ))

        gyro = mpu9250.readGyro()
        print(" gx = " , ( gyro['x'] ))
        print(" gy = " , ( gyro['y'] ))
        print(" gz = " , ( gyro['z'] ))

        mag = mpu9250.readMagnet()
        print(" mx = " , ( mag['x'] ))
        print(" my = " , ( mag['y'] ))
        print(" mz = " , ( mag['z'] ))
        print()

        time.sleep(0.5)

except KeyboardInterrupt:
    sys.exit()