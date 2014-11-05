$.ajax({
   url: 'http://data.sparkfun.com/output/xROLbJzAlMcjwlN5dolp.json',
   jsonp: 'callback',
   cache: true,
   dataType: 'jsonp',
   data: {
     page: 1
   },
   success: function(response) {
     var temp = response[0]['temp'];
     var humidity = response[0]['humidity'];
     var timestamp = response[0]['timestamp'];

     $('#temperature').text('TEMPERATURE: ' + temp + ' °C');
     $('#humidity').text('HUMIDITY: ' + humidity + ' %');
   }
 });
