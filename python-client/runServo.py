import RPi.GPIO as GPIO
from time import sleep

#Declare the GPIO settings
GPIO.setmode(GPIO.BOARD)

#set up GPIO pins
GPIO.setup(3, GPIO.OUT)
pwm=GPIO.PWM(3, 50)
pwm.start(0)

#Define the function to control the angle
def SetAngle(angle):
    duty = angle / 18 + 2
    GPIO.output(3, True)
    pwm.ChangeDutyCycle(duty)
    sleep(1)
    GPIO.output(3, False)
    pwm.ChangeDutyCycle(0)

#Specify one or multiple servo angles
SetAngle(90)
SetAngle(80)
SetAngle(70)
SetAngle(60)
SetAngle(50)
SetAngle(40)
SetAngle(0)


#Stop the servo
pwm.stop()
GPIO.cleanup()

#If GPIO error messages appear, use the following:
#GPIO.setwarnings(False)