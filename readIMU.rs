use std::error::Error;
use std::thread;
use std::time::Duration;

use rppal::i2c::I2c;

// DS3231 I2C default slave address.
const ADDR_IMU: u16 = 0x68;

// DS3231 register addresses.
const REG_ACCX: usize = 0x59;
const REG_ACCY: usize = 0x61;
const REG_ACCZ: usize = 0x63;
const REG_TEMP: usize = 0x65;
const REG_GYROX: usize = 0x67;
const REG_GYROY: usize = 0x69;
const REG_GYROZ: usize = 0x71;

// Helper functions to encode and decode binary-coded decimal (BCD) values.
fn bcd2dec(bcd: u8) -> u8 {
    (((bcd & 0xF0) >> 4) * 10) + (bcd & 0x0F)
}

fn dec2bcd(dec: u8) -> u8 {
    ((dec / 10) << 4) | (dec % 10)
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut i2c_imu = I2c::new()?;
	let mut imu_who;

    // Set the I2C slave address to the device we're communicating with.
    i2c_imu.set_slave_address(ADDR_IMU)?;


	i2c_imu.block_read(0x117, &mut imu_who);
	println!("Who is it? it is {}", imu_who);

    let mut reg_imu = [0u8; 7]; //Each data point for this sensor
    loop {
        i2c_imu.block_read(REG_ACCX as u8, &mut reg_imu)?;
		println!("Data read: {:?}", reg_imu);
        thread::sleep(Duration::from_secs(1));
    }
}