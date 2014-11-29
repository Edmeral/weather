#arduino-weather-station


Using an Arduino and a Raspberry Pi to create a 
weather station with live updates accessible 
from the Internet. 

## How it works
The Arduino gets the weather information from the [DHT11 sensor](http://FIXME), parse that information then sends it to Raspberry pi (or any computer) via serial port, the pi gets that information and sends it to the [sparkfun API](http://FIXME)

