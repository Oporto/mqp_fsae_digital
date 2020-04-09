mod readIMU;
mod readWS;
mod readTemp;
mod readHumTemp;

fn main() {
    readIMU::readIMU();
    readWS::readWS();
    readTemp::readTemp();
    readHumTemp::readHumTemp();
}