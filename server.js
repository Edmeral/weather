var sensorLib = require('node-dht-sensor');
var request = require('request');
var dotenv = require('dotenv');
dotenv.load();


var privateKey = process.env.SPARKFUN_PRIVATE_KEY;
var lastTemp, lastHumidity;

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
        
        var temp = readout.temperature.toFixed(0);
        var humidity = readout.humidity.toFixed(0);

        if (temp != lastTemp || humidity != lastHumidity) {
          lastTemp = temp;
          lastHumidity = humidity;

          request('https://data.sparkfun.com/input/xROLbJzAlMcjwlN5dolp?private_key=' + privateKey + '&humidity=' + humidity + '&temp=' + temp, function(err, res, body) {
            if (!err && res.statusCode == 200) 
                console.log('Data sent successfully! (' + temp + '°C, ' + humidity + '%)');
            else 
                console.log('Error while sending data!');
          });
        }

        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}