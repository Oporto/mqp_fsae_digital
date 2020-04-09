import micropython
from machine import I2C, Pin, Timer
from mpu9250 import MPU9250
from ak8963 import AK8963

micropython.alloc_emergency_exception_buf(100)

i2c = I2C(scl=Pin(3), sda=Pin(2))

dummy = MPU9250(i2c) # this opens the bybass to access to the AK8963
ak8963 = AK8963(i2c)
offset, scale = ak8963.calibrate(count=256, delay=200)

sensor = MPU9250(i2c, ak8963=ak8963)

def read_sensor(timer):
    print(sensor.acceleration)
    print(sensor.gyro)
    print(sensor.magnetic)
    print(sensor.temperature)

print("MPU9250 id: " + hex(sensor.whoami))

timer_0 = Timer(0)
timer_0.init(period=1000, mode=Timer.PERIODIC, callback=read_sensor)