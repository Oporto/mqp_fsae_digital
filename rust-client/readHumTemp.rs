use std::error::Error;
use std::thread;
use std::time::{Duration, SystemTime};
use std::collections::LinkedList;

use rppal::gpio::Gpio;

const PIN_N: u8 = 23;
const MAX_TIMINGS: u8 = 85;

pub fn readHumTemp() -> [0u8; 5] {
    let mut dht11_data: [0u8; 5] = [0,0,0,0,0];
    let mut laststate = true;
    let mut counter = 0;
    let mut j = 0;
    let mut f: f32;

    let mut out_pin = gpio.get(PIN_N)?.into_ouyput();
    out_pin.set_low();
    thread::sleep(Duration::from_millis(18));
    out_pin.set_high();
    thread::sleep(Duration::from_micros(40));
    let mut in_pin = gpio.get(PIN_N)?.into_input();

    for i in 0..MAX_TIMINGS{
        counter = 0;
        while in_pin.is_high() == laststate{
            counter = counter + 1;
            thread::sleep(Duration::from_micros(1));
            if counter == 255{
                break;
            }
        }
        laststate = in_pin.is_high();
        if counter == 255{
            break;
        }
        if (i >= 4) && (i % 2 == 0){
            dht11_data[j/8] = dht11_data[j/8] << 1;
            if counter > 16{
                dht11_data[j/8] = dht11_data[j/8] | 1;
            }
            j = j + 1;
        }
    }
    if (j >= 40) && (dht11_data[4] == ((dht11_data[0] + dht11_data[1] + dht11_data[2] + dht11_data[3]) & 0XFF)){
        dht11_data;
    }else{
        [0,0,0,0,0];
    }
}