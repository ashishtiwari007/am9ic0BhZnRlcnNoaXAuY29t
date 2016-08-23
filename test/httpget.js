var request = require('request');
const http = require('http');

var options = {
    hostname: 'rate-exchange-1.appspot.com',
    Port: 80,
    path: '/currency?from=HKD&to=USD',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }

};


http.get(options, function (http_res) {
    // initialize the container for our data
    var data = "";
    // this event fires many times, each time collecting another piece of the response
    http_res.on('data', function (chunk) {
        // append this chunk to our growing `data` var
        console.log('chunk'+chunk);
    });
    // this event fires *one* time, after all the `data` events/chunks have been gathered
    http_res.on('end', function () {
        console.log('data'+data);
    });
});
