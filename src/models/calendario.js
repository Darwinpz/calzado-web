const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const CalendarioSchema = new Schema({

    title: { type: String },
    start: {type: String},
    end: {type: String},
    backgroundColor: {type: String},
    url:{type: String},
    estado: {type: String}

});


module.exports = mongoose.model('Calendario', CalendarioSchema);