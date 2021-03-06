var Beanworker = require('fivebeans').worker;
var client = require('beanstalk_client').Client;

// Set options
var options = {
    id: 'worker_1', // The ID of the worker for debugging and tacking
    host: 'challenge.aftership.net', // The host to listen on
    port: 11300, // the port to listen on
    handlers: {
        'j_type': require('./handler')()// setting handlers for types
    },
    ignoreDefault: true
};

var worker = new Beanworker(options); // Instantiate a worker

worker.start(['work_tube']);
