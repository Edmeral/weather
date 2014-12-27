I created this project to experiment with using and Arduino board and a Raspberry Pi together, it's basically a simple weather station with live updates accessible from the Internet. Demo [here](http://weather.aissam.me).

## How it works
The Arduino gets the weather information from the [DHT11 sensor](http://www.adafruit.com/product/386), parses that information then sends it to Raspberry pi (or any computer) via serial port (usb), the pi gets that information and sends it to the [sparkfun API](https://data.sparkfun.com/streams/xROLbJzAlMcjwlN5dolp) to be stored there. The `master` branch contains the code that does this, the Arduino folder is destined to be sent to the Arduino baord, while server.js is to be run on the the Raspberry Pi.
