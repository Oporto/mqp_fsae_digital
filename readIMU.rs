use std::error::Error;
use std::thread;
use std::time;

use rppal::i2c::I2c;

// DS3231 I2C default slave address.
const ADDR_IMU: u16 = 0x68;

// DS3231 register addresses.
const REG_ACC: u8 = 0x3B;
const REG_GYRO: u8 = 0x43;
const REG_TEMP: u8 = 0x41;
const REG_ME: u8 = 0x75;
const user_ctrol: u8 = 0x6A;
const i2c_mst_en: [u8;1] = [0x20];
const config: u8 = 0x1A;
const gyro_dlpf_184: [u8;1] = [0x01];
//reset(pwr_mgnt_1, Pwr_reset)
const pwr_mgmnt_1: u8 = 0x6B;
const pwr_reset: [u8;1] = [0x80];
//delay
//Select clock source to gyro (pwr_mgmnt_1, clock_sel_pll)
const clock_sel_pll: [u8;1] = [0x01];
//enable acc and gyro (pwr_mngt_2, Sen_enable)
const pwr_mgmnt_2: u8 = 0x6C;
const sen_enable: [u8;1] = [0x00];
//Set accel range (accel_onfig, accel_fs_sel_16g)
const accel_config: u8 = 0x01C;
const accel_fs_sel_16g:[u8;1]= [0x18];
const accel_fs_sel_8g :[u8;1] = [0x10];
const accel_fs_sel_4g :[u8;1] = [0x08];
//Set gyro range (Gyro_config, Gyro_fs_sel_2000DPS)
const gyro_config: u8 = 0x1B;
const gyro_fs_sel_2000DPS :[u8;1]= [0x18];
//Set bandwith as def (accel_config2, accel_dlpf_185) + (Config, gyro_dlpf_184)
const accel_config2: u8 = 0x1D;
const accel_dlpf_184 :[u8;1] = [0x01];
//set sample rate divider to 0 (smpdiv, 0x00)
const smpdiv: u8 = 0x19;
//enable i2c master mode (user_ctrol, i2c_mst_en)
//Set bus speed to 400 khz pwr_reset(i2x_mst_ctrl, i2c_mst_clk)
const i2c_mst_ctrl: u8 = 0x24;
const i2c_mst_clk:[u8;1] = [0x0D];


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
    //enable i2c master mode (user_ctrol, i2c_mst_en)
    i2c_imu.block_write(user_ctrol, &i2c_mst_en[0..1])?;
    
    //reset(pwr_mgnt_1, Pwr_reset)
    i2c_imu.block_write(pwr_mgmnt_1, &pwr_reset[0..1])?;
    //delay
    thread::sleep(time::Duration::from_secs(1));
    //Select clock source to gyro (pwr_mgmnt_1, clock_sel_pll)
    i2c_imu.block_write(pwr_mgmnt_1, &clock_sel_pll[0..1])?;
    //enable acc and gyro (pwr_mngt_2, Sen_enable)
    i2c_imu.block_write(pwr_mgmnt_2, &sen_enable[0..1])?;
    //Set accel range (accel_onfig, accel_fs_sel_16g)
    i2c_imu.block_write(accel_config, &accel_fs_sel_16g[0..1])?;
    //Set gyro range (Gyro_config, Gyro_fs_sel_2000DPS)
    i2c_imu.block_write(gyro_config, &gyro_fs_sel_2000DPS[0..1])?;
    //Set bandwith as def (accel_config2, accel_dlpf_185) + (Config, gyro_dlpf_184)
    i2c_imu.block_write(accel_config2, &accel_dlpf_184[0..1])?;
    i2c_imu.block_write(config, &gyro_dlpf_184[0..1])?;
    //set sample rate divider to 0 (smpdiv, 0x00)
    i2c_imu.block_write(smpdiv, &[0x00])?;
    //enable i2c master mode (user_ctrol, i2c_mst_en)
    i2c_imu.block_write(user_ctrol, &i2c_mst_en[0..1])?;
    //Set bus speed to 400 khz (i2x_mst_ctrl, i2c_mst_clk)
    i2c_imu.block_write(i2c_mst_ctrl, &i2c_mst_clk[0..1])?;
    
    let mut reg_imu = [0u8; 14]; //Each data point for this sensor
    for n in 0..10{
        i2c_imu.block_read(REG_ACC, &mut reg_imu)?;
	    println!("Data read: {:?}", reg_imu);
    }
    return Ok(());
}