const mongoose = require('mongoose');

const {Schema} = mongoose;

const AgendaSchema = new Schema({
    nombreagenda: {type: String},
    fecha: {type: Date},
    descripcion: {type: String},  
    estado: {type: String}, 
    creacion: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Agenda',ProductoSchema);