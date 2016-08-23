'use strict';
const mongoose = require('mongoose');

    /**
     * This file is containing information about the DB connection and URL with collections
     */

    const mongooseDB = mongoose.connect('mongodb://localhost/currex');
/* const db = mongooseDB.connection;*/

