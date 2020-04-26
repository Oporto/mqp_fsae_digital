import RPi.GPIO as GPIO
 
ObstaclePin = 24
 
def __setup():
    GPIO.setmode(GPIO.BOARD) # Set GPIO by numbers 
    GPIO.setup(ObstaclePin, GPIO.IN, pull_up_down=GPIO.PUD_UP)
 
def __loop():
    print("Obstacle Avoidance Sensor Test \n")
    while True:
        if (0 == GPIO.input(ObstaclePin)):
            print(" DETECTED: There is an obstacle ahead")
        else:
            print("clear")
 
def __destroy():
    GPIO.cleanup() # Release resource
 
def read(): # The Program start here
    __setup()
    try:
        __loop()
    except KeyboardInterrupt: # Control C is pressed, the child program destroy will be executed.
        __destroy()