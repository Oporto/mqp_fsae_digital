import Adafruit_ADS1x15 as ADS1x15
from time import time as tm
from time import sleep
import pandas as pd
import numpy as np

class Ads_reader:
    "Includes driver for reading from an ADS 1115"
    def __init__(self, addr):
        #Class creates version of adc 
        self.adc = ADS1x15.ADS1115(address=addr)
        #Set internal values for gain and max voltage that are paired
        self.GAIN = 2/3
        self.MAX_V = 6.144

    #General reads
    #Single read of channel ch: a0-0, a1-1, a2-2, a3-3
    def read_single(self,ch):
        rd = self.adc.read_adc(ch,self.GAIN)
        #Adjusts to voltage based on gain and max voltage
        return self.MAX_V*rd/32767
    
    #Comparission read between channels a0 and a1
    def read_diff(self):
        rd = self.adc.read_adc_difference(0,self.GAIN)
        return self.MAX_V*rd/32767

#create object of class above and give it i2C bus address: 0x48
ads = Ads_reader(0x48)