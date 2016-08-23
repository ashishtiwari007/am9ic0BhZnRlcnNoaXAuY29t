'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const currex = require('../model/currencyexch.js');
//const db = require('../lib/dbconnect');
const option = require('../lib/option');


module.exports = {

    /**
     * saving the currency exchange rate with from and to in the DB
     *
     * @param {object} [req] - req is a json object which we received from the http GET request
     * @return {object} [currencyexch] - this is callback response from the model
     */

    saveCurrencyExch: function (req, callback) {
       // const currencyexch = JSON.stringify(req);
        let result = '';
            console.log('calling save currency:::' + req);
        currex.addCurrex(req, function (err, currencyexch) {
            if (err) {
                throw err;
            }
            result = JSON.stringify(currencyexch);
            console.log('result:::' + JSON.stringify(currencyexch));
            callback(null, result);
        });
        callback(null, result);
    },

    /**
     * This method is used to set the result in the option parameter. Also this method is converting rate in two decimal
     * point by using toFixed. If their is a error in the response from the http GET setting the error =1 which will be
     * used to identify if the request was successful or not.
     *
     * @param {object} [req] - req is a json object which we received from the http GET request
     * @return {object} [option.result] - this is callback response from the model
     */


    setRate: function (req, callback) {
        if (JSON.parse(req).rate != null) {
            const updatedRate = JSON.parse(req).rate.toFixed(2);
            console.log('updatedRate::: ' + updatedRate);
            option.result.from = JSON.parse(req).from;
            option.result.to = JSON.parse(req).to;
            option.result.rate = updatedRate;
            option.result.create_at = new Date();
        } else {
            option.result.error = 1;
        }
        callback(null, option.result);
    },

    /**
     * This method is used to set the path in the option parameter. This method is taking req which we got from tube.
     *
     * @param {object} [req] - req is a json object which we received from consuming tube.
     * @return {object} [option.currParam] - this is callback response from the model
     */

    setCurrParam: function (req, callback) {
        console('in set currency param');
        const from = req.from;
        const to = req.to;
        option.currParam.path = '/currency?from=' + from + '&to=' + to;
       console.log('currParam::   ' + option.currParam);
    }
};
