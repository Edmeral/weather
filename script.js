var tempTag = document.querySelector('#temperature');
var humidityTag = document.querySelector('#humidity');
var timestampTag = document.querySelector('footer span');

var url = 'https://data.sparkfun.com/output/xROLbJzAlMcjwlN5dolp.json?page=1';

var request = new XMLHttpRequest();

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    response = JSON.parse(request.responseText);

    var temp = response[0].temp;
    var humidity = response[0].humidity;
    var timestamp = response[0].timestamp;

    tempTag.innerHTML = 'TEMPERATURE: ' + temp + ' °C';
    humidityTag.innerHTML = 'HUMIDITY: ' + humidity + ' %';
    timestampTag.innerHTML = moment(timestamp).fromNow();

    favicon.badge(temp);
  }
};

request.onerror = function() {
  throw new Error("Can't get the data for Sparkfun");
};


//Favicon configuration
var favicon = new Favico({
  type: 'rectangle',
  bgColor: '#E5AD62',
  textColor: '#ff0',
  animation: 'none',
  fontFamily: 'Varela Round'
});

function update() {
  // Getting the data from SparkFun API
  request.open('GET', url, true);
  request.send();
}

update();
setInterval(update, 10000);