const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    foto: {type: []},
    views: {type: Number,default: 0},
    likes: {type: Number, default: 0},
    categorias: {type: []},
    items: {type: []},
    creacion: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Producto',ProductoSchema);