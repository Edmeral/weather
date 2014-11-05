var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});

sp.open(function (err) {
  if (err) console.log('failed to open: '+ error);
  else {
    sp.on('data', function(data) {
      var temp = Number(data.split(' ')[0]);
      var humidity = Number(data.split(' ')[1]);
      console.log(temp + ' ' + humidity);
    });
  }
});