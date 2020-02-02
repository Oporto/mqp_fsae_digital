use std::error::Error;
use std::thread;
use std::time::Duration;

use rppal::i2c::I2c;

// DS3231 I2C default slave address.
const ADDR_IMU: u16 = 0x68;

// DS3231 register addresses.
const REG_ACC: u8 = 0x3B;
const REG_GYRO: u8 = 0x43;
const REG_TEMP: u8 = 0x41;
const REG_ME: u8 = 0x75;

// Helper functions to encode and decode binary-coded decimal (BCD) values.
fn bcd2dec(bcd: u8) -> u8 {
    (((bcd & 0xF0) >> 4) * 10) + (bcd & 0x0F)
}

fn dec2bcd(dec: u8) -> u8 {
    ((dec / 10) << 4) | (dec % 10)
}

fn main() -> Result<(), Box<dyn Error>> {
    let mut i2c_imu = I2c::new()?;
	let mut imu_who = [0u8;1];

    // Set the I2C slave address to the device we're communicating with.
    i2c_imu.set_slave_address(ADDR_IMU)?;


	i2c_imu.block_read(REG_ME, &mut imu_who)?;
    println!("Who is it? it is {:?}", imu_who);
    
    //Set the i2c clock on i2c_imu
    //Select clock source to gyro (pwr_mgmnt_1, clock_sel_pll)
    //enable i2c master mode (user_ctrol, i2c_mst_en)
    //Set bus speed to 400 khz (i2x_mst_ctrl, i2c_mst_clk)
    //reset(pwr_mgnt_1, Pwr_reset)
    //delay
    //Select clock source to gyro (pwr_mgmnt_1, clock_sel_pll)
    //enable acc and gyro (pwr_mngt_2, Sen_enable)
    //Set accel range (accel_onfig, accel_fs_sel_16g)
    //Set gyro range (Gyro_config, Gyro_fs_sel_2000DPS)
    //Set bandwith as def (accel_config2, accel_dlpf_185) + (Config, gyro_dlpf_184)
    //set sample rate divider to 0 (smpdiv, 0x00)
    //enable i2c master mode (user_ctrol, i2c_mst_en)
    //Set bus speed to 400 khz (i2x_mst_ctrl, i2c_mst_clk)

    let mut reg_imu = [0u8; 14]; //Each data point for this sensor
    i2c_imu.block_read(REG_ACC, &mut reg_imu)?;
	println!("Data read: {:?}", reg_imu);
    return Ok(());
}