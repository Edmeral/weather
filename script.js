var temp, lastTemp, humidity, LastHumidity, timestamp;
var request = new XMLHttpRequest();
var url = 'https://data.sparkfun.com/output/xROLbJzAlMcjwlN5dolp.json?page=1';

var tempTag = document.querySelector('#temperature');
var humidityTag = document.querySelector('#humidity');
var timestampTag = document.querySelector('footer span');

function update() {
  // Getting the data from SparkFun API
  request.open('GET', url, true);

  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {
      response = JSON.parse(request.responseText);

      temp = response[0].temp;
      humidity = response[0].humidity;
      timestamp = response[0].timestamp;

      // When something changes update the page
      if (temp != lastTemp || humidity != LastHumidity) {
        tempTag.innerHTML = 'TEMPERATURE: ' + temp + ' °C';
        humidityTag.innerHTML = 'HUMIDITY: ' + humidity + ' %';
        timestampTag.innerHTML = moment(timestamp).fromNow();

        lastTemp = temp;
        lastHumidity = humidity;
      }
    }
  };

  request.onerror = function() {
    throw new Error("Can't get the Data for Sparkfun");
  };

  request.send();
}

update();
setInterval(update, 10000);