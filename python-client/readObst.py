import RPi.GPIO as GPIO
import asyncio
import time


class wheelSpeed:
    def __init__(self,pin):
        self.obstaclePin = pin
        GPIO.setmode(GPIO.BOARD) # Set GPIO by numbers 
        GPIO.setup(pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        self.cycle = 5000 #time in ms for each read
        self.n = 4 # number of extrusions on wheel

    def __read(self):
        return GPIO.input(self.obstaclePin)

    async def readRPM(self):
        count = 0
        periods = []
        start = time.time()
        while(self.__read()==1):
             el = time.time()-start
             if el >= self.cycle:
                 break
        if el < self.cycle:
            periods.append(time.time()-start)
            count = 1
        while(el < self.cycle):
            if(self.__read()==1):
                p = time.time() - periods[count-1]
                periods.append(p)
                count = count + 1
            el = time.time()-start
        if count > 1:
            rpm = (1/(sum(periods[1:])/(count-1)))/self.n
        else:
            rpm = 0
        return rpm
        



