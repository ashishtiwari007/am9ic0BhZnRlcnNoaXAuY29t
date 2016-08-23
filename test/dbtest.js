var Promise = require('bluebird');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var dbUrl = 'mongodb://localhost/bookstore';



const currencyexchSchema = mongoose.Schema({
    genre: {
        type: String,
        required: true
    }

});

const genere = module.exports = mongoose.model('genere', currencyexchSchema);
module.exports.addCurrex = function (genere, callback) {
    console.log('now in add currex' + genere);
    genere.create(genere, callback);
};

MongoClient
    .connect(dbUrl, {
        promiseLibrary: Promise
    })
    .then(function(db) {
        return db
            .collection('genere')
            .insert({ _id: 5, name: 'Thriller23'}) // find returns cursor
            //.toArray() // cursor methods return promises: http://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html#toArray
            .then(function(documents) {
                console.log('documents.length', documents);
            })
            .finally(db.close.bind(db));
    })
    .catch(function(err) {
        console.error("ERROR", err);
    });