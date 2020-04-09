extern crate i2cdev;

use std::thread;
use std::time::Duration;

use i2cdev::core::*;
use i2cdev::linux::{LinuxI2CDevice, LinuxI2CError};
use ads1x15::Ads1x15;

// ADS1115-TEMP I2C default slave address.
const ADDR_TEMP: u16 = 0x48;

pub fn readTemp() -> i32{
    let mut dev = LinuxI2CDevice::new("/dev/i2c-1", ADDR_TEMP)?;

    let tempADC = Ads1x15.new_ads1115(dev)?;
    tempADC.set_gain(Within4_096V);

    tempVolt = tempADC.read_single_ended(A0).wait();
    tempVolt
}


