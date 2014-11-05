var temp, lastTemp, humidity, LastHumidity, timestamp;

setInterval(function() {
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
}, 10000);
