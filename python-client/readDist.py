#Libraries
import RPi.GPIO as GPIO
import time
import keyboard
import pandas as pd
 
#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
 
#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24
GPIO_OBSTACLE = 23
 
#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)
GPIO.setup(GPIO_OBSTACLE,GPIO.IN, pull_up_down=GPIO.PUD_UP)

def obstacle():
    return GPIO.input(GPIO_OBSTACLE)
 
def distance():
    # set Trigger to HIGH
    GPIO.output(GPIO_TRIGGER, True)
 
    # set Trigger after 0.01ms to LOW
    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)
 
    StartTime = time.time()
    StopTime = time.time()
 
    # save StartTime
    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()
 
    # save time of arrival
    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()
 
    # time difference between start and arrival
    TimeElapsed = StopTime - StartTime
    # multiply with the sonic speed (34300 cm/s)
    # and divide by 2, because there and back
    distance = (TimeElapsed * 34300) / 2
 
    return distance

if __name__ == '__main__':
    dt_read = pd.DataFrame(columns=["Distance","Obstacle","Saved"])
    try:
        while True:
            dist = distance()
            obst = obstacle()
            saved = 0
            print("Measured Distance = %.1f cm" % dist)
            if keyboard.is_pressed('r'):
                saved = 1
            dt_read = dt_read.append({"Distance": dist ,"Obstacle":obst, "Saved":saved}, ignore_index=True)
            time.sleep(1)
 
        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
        print("Saved values: ", dt_read)
        dt_read.to_csv("dist_obst_cal.csv")
        GPIO.cleanup()