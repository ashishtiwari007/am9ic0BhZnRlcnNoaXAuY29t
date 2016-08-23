'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// const controller = require('../controller/curr-rate-controller');
const option = require('../lib/option');

const httpreqest = require('./httpreq');

module.exports = function () {
    const options = {
        success: {
                time: 10,
                delay: 60
            },
            failed: {
                time: 3,
                delay: 3
            }
        };

    /**
     * Definition of the handler
     * @constructor
     */

    function CurrencyKeysHandler() {
        this.type = 'j_type';
    }

    /**
     * This method is calling the currency conversion http GET request
     * @param {object} [payload]
     * @return {object} [callback]
     */

    const getCurrencyRate = function (data, callback) {
       // const error = 0;
        let result;
        console.log('in get getCurrencyRate');
        console.log('get result of ', data);
        httpreqest.callingCurrConversion(data);
        console.log('dbdata error' + option.result.error);
        if (option.result.error !== '1') {
             result = 'success';
        } else {
             result = 'fail';
        }
        callback(option.result.error, result);
    };

    /**
     * This method will handle the request coming from the handler and if it is success it will try after 60 seconds and
     * if it is failure it will try after 3 secs with the help of setTimeout method which will help to delay the request.
     * @param {object} [payload] - this object will be sending to http get request.
     * @param {Number} [success_time]
     * @param {Number} [failed_time]
     *
     */

    CurrencyKeysHandler.prototype.getCurrency = function (payload, success_time, failed_time) {
        let _this = this;
        console.log('in get currency');
        let delay;
        getCurrencyRate(payload, function (error, results) {
            if (error !== 0) {
                failed_time++;
                console.log('Request Failed ' + failed_time);
                 delay = options.failed.delay * 1000;
            } else {
                failed_time = 0;
                success_time++;
                 delay = options.success.delay * 1000;
                console.log('request sucess' + delay);
            }
            if (failed_time < options.failed.time && success_time < options.success.time) {
                console.log('before calling settimeout');
                setTimeout(function () {
                    _this.getCurrency(payload, success_time, failed_time);
                }, delay);
            } else {
                console.log('Job done!!');
            }
        });
    };

    /**
     * defining the method work which will take payload as the request and returns the callback.
     * @param {obejct} [payload] - transferring the payload to getCurrency method to get the currency rate
     *
     */

    CurrencyKeysHandler.prototype.work = function (payload, callback) {
            console.log('more testing' + payload.to);
            let _this = this;
            _this.getCurrency (payload, 0, 0);
    };

    /**
     * Intantiating new handler on each and every new request.
     *
     */

    const handler = new CurrencyKeysHandler();
    return handler;
};
