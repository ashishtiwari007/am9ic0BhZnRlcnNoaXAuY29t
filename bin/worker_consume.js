'use strict';
const Beanworker = require('fivebeans').worker;
// var client = require('beanstalk_client').Client;
// var controller = require('../controller/curr-rate-controller');

/**
 * consuming payload from the tube.
 * @property {string} [id] - currency from which you want the rate.
 * @property {string} [host] - currency to which you want the rate.
 * @property {json} [handler] - calling the handler
 * @constant
 */

// Set options
const options = {
    id: 'worker_1', // The ID of the worker for debugging and tacking
    host: 'challenge.aftership.net', // The host to listen on
    port: 11300, // the port to listen on
    handlers: {
        'j_type': require('../controller/currencyKeysHandler')()// setting handlers for types
    },
    ignoreDefault: true
};

const worker = new Beanworker(options); // Instantiate a worker

worker.start(['work_tube12']); // started consuming the tube

console.log('BeanStalk Consumer is ready to consume from work_tube :::');
