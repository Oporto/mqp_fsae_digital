import Adafruit_ADS1x15 as ADS1x15


class Ads_reader:
    "Includes driver for reading from an ADS 1115"
    def __init__(self, addr):
        self.adc = ADS1x15.ADS1115(address=addr, bus=1)
        self.GAIN = 1

    #General reads
    def read_single(self,ch):
        rd = self.adc.read_adc(ch,self.GAIN)
        return rd
    
    def read_diff(self):
        rd = self.adc.read_adc_diff(self.GAIN)
        return rd
    
    #Now, function that vary based on what is installed 

    def read_thermistor(self):
        return self.read_single(0)