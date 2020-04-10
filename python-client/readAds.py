import Adafruit_ADS1x15 as ADS1x15


class Ads_reader:
    "Includes driver for reading from an ADS 1115"
    def __init__(self, addr):
        self.adc = ADS1x15.ADS1115(address=addr)
        self.GAIN = 1

    #General reads
    def read_single(self,ch):
        rd = self.adc.read_adc(ch,self.GAIN)
        return (4.096)*rd/32767
    
    def read_diff(self):
        rd = self.adc.read_adc_difference(0,self.GAIN)
        return (4.096)*rd/32767
    
    #Now, function that vary based on what is installed 

    def read_thermistor(self):
        return self.read_single(2)


ads = Ads_reader(0x48)


print(ads.read_single(0))
print(ads.read_single(1))
print(ads.read_thermistor())
print(ads.read_single(3))

while True:
    print("Difference between 0 and 1: ", ads.read_diff())