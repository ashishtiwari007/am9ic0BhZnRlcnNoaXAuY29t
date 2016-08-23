'use strict';
const mongoose = require('mongoose');
const db = require('../lib/dbconnect');

/**
 * This file contains the model definition.
 *
 */

const currencyexchSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
         required: true
    },
    rate: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }

});

let currex = module.exports = mongoose.model('currencyexch', currencyexchSchema);

/**
 * This method is calling the mongoose DB to save the data into DB.
 * @param {object} [currencyexch] - containg the JSON formatted request which is going to save in the DB along with
 * current timestamp.
 * @return {object} [callback] - this will be callback to the previous function to tell if data save is successful or
 * not.
 *
 */

module.exports.addCurrex = function (currencyexch, callback) {
    console.log('now in add currex' + currencyexch);
   currex.create(currencyexch, callback);
};
