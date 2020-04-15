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
        self.GAIN = 1
        self.MAX_V = 4.096

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

    def tc_function(self, volt):
        adj_volt = volt*10e6
        a = [0,0.025928,-0.0000007602961,0.00000000004637791,-2.165394E-15,6.048144E-20,-7.29342E-25]
        t_raw = a[0]+a[1]*adj_volt+a[2]*(adj_volt**2)+a[3]*(adj_volt**3)+a[4]*(adj_volt**4)+a[5]*(adj_volt**5)+a[6]*(adj_volt**6)
        t_calibrated = 1.3816*t_raw + 43.568
        return t_calibrated

    def the_function(self, volt):
        t_calibrated = 18.143*volt - 22.445
        return t_calibrated

    def compute_reads_tc(self,time, step):
        tc_read = pd.DataFrame(columns=["Time","Voltage","Temperature"])
        start_time = tm()
        delta_t = 0
        while(delta_t <= time):
            volt = self.read_diff()
            delta_t = tm() - start_time
            tc_read = tc_read.append({"Time": delta_t ,"Voltage":volt, "Temperature":self.tc_function(volt)}, ignore_index=True)
            sleep(step)

        return tc_read

    def compute_reads_the(self,time, step):
        the_read = pd.DataFrame(columns=["Time","Voltage","Temperature"])
        start_time = tm()
        delta_t = 0
        volt = self.read_single(2)
        while(delta_t <= time or (self.the_function(volt) < 45 and self.the_function(volt) > 40)):
            volt = self.read_single(2)
            delta_t = tm() - start_time
            the_read = the_read.append({"Time": delta_t ,"Voltage":volt, "Temperature":self.the_function(volt)}, ignore_index=True)
            sleep(step)

        return the_read



#create object of class above and give it i2C bus address: 0x48
ads = Ads_reader(0x48)

#tc = ads.compute_reads_tc(30,0.5)
the = ads.compute_reads_the(30, 0.5)

print(the)

#tc.to_csv("tc_"+str(tm())+".csv")
the.to_csv("the_"+str(tm())+".csv")