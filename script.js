var temp, lastTemp, humidity, LastHumidity, timestamp;
var request = new XMLHttpRequest();
var url = 'https://data.sparkfun.com/output/xROLbJzAlMcjwlN5dolp.json?page=1';

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
        $('#temperature').text('TEMPERATURE: ' + temp + ' °C');
        $('#humidity').text('HUMIDITY: ' + humidity + ' %');
        $('footer span').first().text(moment(timestamp).fromNow());

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