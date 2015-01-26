var request = require('request');
var dotenv = require('dotenv');
dotenv.load();
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});

var privateKey = process.env.SPARKFUN_PRIVATE_KEY;
var lastTemp, lastHumidity, temp, humidity;

sp.open(function (err) {
  if (err) console.log('failed to open: '+ error);
  else {
    sp.on('data', function(data) {

      // If this is the first time we get the information from the Arduino,
      // we don't send it because a lot of times it is wrong,
      // we set the lastTemp and lastHumidity to a value we are sure will be different from the values we will
      // get on the next event so that we are sure to send the new information.
      if (lastTemp === undefined) {
        lastTemp = 1000;
        lastHumidity = 1000;
        console.log("First time! not sending this :)");
      }

      else {
        temp = Number(data.split(' ')[0]);
        humidity = Number(data.split(' ')[1]);

        if (temp != lastTemp || humidity != lastHumidity) {
          lastTemp = temp;
          lastHumidity = humidity;
          
          request('https://data.sparkfun.com/input/xROLbJzAlMcjwlN5dolp?private_key=' + privateKey + '&humidity=' + humidity + '&temp=' + temp, function(err, res, body) {
            if (!err && res.statusCode == 200) console.log('Data sent successfully! (' + temp + '°C, ' + humidity + '%)');
            else console.log('Error while sending data!');
          });
        }
      }
    });
  }
});