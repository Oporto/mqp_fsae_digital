import Adafruit_ADS1x15 as ADS1x15
import time


class Ads_reader:
    "Includes driver for reading from an ADS 1115"
    def __init__(self, addr):
        self.adc = ADS1x15.ADS1115(address=addr)
        self.GAIN = 16
        self.MAX_V = 0.256

    #General reads
    def read_single(self,ch):
        rd = self.adc.read_adc(ch,self.GAIN)
        return self.MAX_V*rd/32767
    
    def read_diff(self):
        rd = self.adc.read_adc_difference(0,self.GAIN)
        return self.MAX_V*rd/32767


ads = Ads_reader(0x48)


for _ in range(30):
    print("Voltage Difference on Thermocouple: ", ads.read_diff())
    time.sleep(1)