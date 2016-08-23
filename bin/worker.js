'use strict';
const fivebeans = require('fivebeans');
const client = new fivebeans.client('challenge.aftership.net', 11300);

/**
 * Create payload to put in the tube.
 * @property {string} [from] - currency from which you want the rate.
 * @property {string} [to] - currency to which you want the rate
 * @constant
 */

const job1 = {
    type: 'j_type',
    payload: {
        from: 'INR',
        to: 'HKD'
    }
};

/**
 * This is used to put the job in  the tube. You can choose any tube name to put and consume.
 * @return {string} [name] - callback response.
 * @return {string} [jobid] - callback response.
 * @return {object} [er] -  incase any error has occurred.
 *
 */


client
    .on('connect', function () {
        client.use('work_tube12', function (err, name) {
            client.put(0, 0, 60, JSON.stringify(['work_tube12', job1]), function (er, jobid) {
                console.log(jobid);
            });
        });
    }).on('error', function (er) {
    console.log(er);
}).on('close', function () {
    console.log('...Closing the tube...');
}).connect();
