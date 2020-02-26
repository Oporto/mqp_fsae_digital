use std::error::Error;
use std::thread;
use std::time::{Duration, SystemTime};
use std::collections::LinkedList;

use rppal::gpio::Gpio;

const PIN_N: u8 = 23;

fn readWS(){
    let mut start = SystemTime::now();
    let gpio = Gpio::new()?;
    let mut pin = gpio.get(PIN_N)?.into_input();
    let mut in_interval = true;
    let mut read = pin.is_high();
    let mut intervals: LinkedList<u32> = LinkedList::new();

    while(pin.is_low()){};
    let mut last_high = SystemTime::now();

    while start.elapsed().unwrap() < Duration::from_millis(500){
        read = pin.is_high();
        this_now = SystemTime::now();
        if (read && in_interval){
            interval = last_high.elapsed().unwrap();
            last_high = this_now;
            in_interval = false;
            intervals.push_front(interval);
        }
        else if(!read){
            in_interval = true;
        }
        thread::sleep(Duration::from_millis(1));
    }

    let mut iter = intervals.iter();
    let mut sum = 0;
    let size = intervals.len();

    for i in 0..size {
        sum = sum + iter.next();
    }
    return sum/size;
}