var temp, lastTemp, humidity, LastHumidity, timestamp;

function update() {
  console.log('one');
  $.ajax({
     url: 'http://data.sparkfun.com/output/xROLbJzAlMcjwlN5dolp.json',
     jsonp: 'callback',
     cache: true,
     dataType: 'jsonp',
     data: {
       page: 1
     },
     success: function(response) {

       temp = response[0]['temp'];
       humidity = response[0]['humidity'];
       timestamp = response[0]['timestamp'];

       // When something changes update the page
       if (temp != lastTemp || humidity != LastHumidity) {
         $('#temperature').text('TEMPERATURE: ' + temp + ' °C');
         $('#humidity').text('HUMIDITY: ' + humidity + ' %');

         lastTemp = temp;
         lastHumidity = humidity;
       }

     }
   });
}

update();
setInterval(update, 10000);
