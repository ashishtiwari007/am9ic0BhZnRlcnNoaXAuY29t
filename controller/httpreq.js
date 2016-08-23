'use strict';
// const request = require('request');
const http = require('http');
const controller = require('./curr-rate-controller');
const option = require('../lib/option');

module.exports = {
    /**
     * Calling http call to currency conversion engine. Getting the data as JSON response. Manipulation of the response
     * is done in end method like rate round off to two decimal place . Also verifying the response from the source
     * whether it is containing error or not.
     * @param {object} [req] -  currency param is passed in the url
     */

    currConversion: function (req, callback) {
        let retunrresults = "";
        const options = option.currParam;
         http.get(options, function (http_res) {
            // initialize the container for our data
            let data = "";
            // this event fires many times, each time collecting another piece of the response
            http_res.on('data', function (chunk) {
                console.log('chunk' + chunk);
                data += chunk;
            });

            // this event fires *one* time, after all the `data` events/chunks have been gathered
            http_res.on('end', function () {
                console.log('data' + data);
                        controller.setRate(data, function (error, result) {
                            if (error !== null) {
                                console.log('error occured ' + error.message);
                            }
                            // after every request get the result, callback function
                            console.log('set rate is done');
                        });
                    console.log('option' + option.result.from);
                    console.log('option error' + option.result.error);
                let errorRate = option.result.error;
                if (errorRate !== '1') {
                    controller.saveCurrencyExch(option.result, function (error, result) {
                        if (error !== null) {
                            console.log('error occured ' + error.message);
                            throw error;
                        }
                        console.log('save currency is done in DB' + result);
                        // after every request get the result, callback function
                        retunrresults = 'success1';
                    });
                } else {
                    console.log('did not save in the data base as there was an error ');
                }
            });
            console.log('http get returning ::::' + retunrresults);
            callback(null, retunrresults);
        });
        callback(null, retunrresults);
    },

    /**
     * This method is used to set the path in the option parameter. This method is taking req which we got from tube.
     *
     * @param {object} [req] - req is a json object which we received from consuming tube.
     *
     */

    callingCurrConversion: function (req) {
        console.log('called callingCurrConversion');
        const from = req.from;
        const to = req.to;
        option.currParam.path = '/currency?from=' + from + '&to=' + to;
        console.log('currParam::   ' + option.currParam);
        this.currConversion(option.currParam, function (err, res) {
            if (err != null) {
                console.log('error occurred in currConversion');
                throw err;
            }
            console.log('going to return success#####' + res.toString());
        });
    }
};
