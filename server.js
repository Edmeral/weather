var request = require('request');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});

var privateKey = 'vznZraVDlyt2R09Jdn0n';
var lastTemp, lastHumidity, temp, humidity;

sp.open(function (err) {
  if (err) console.log('failed to open: '+ error);
  else {
    sp.on('data', function(data) {
      temp = Number(data.split(' ')[0]);
      humidity = Number(data.split(' ')[1]);

      if (lastTemp != temp || lastHumidity != humidity) {
        lastTemp = temp;
        lastHumidity = humidity;
        
        request('https://data.sparkfun.com/input/KJQ87RovVrUN6LzqMxLx?private_key=' + privateKey + '&humidity=' + humidity + '&temp=' + temp, function(err, res, body) {
          if (!err && res.statusCode == 200) console.log('Data sent succesfully!');
          else console.log('Error while sending data!');
        });
      }
    });
  }
});