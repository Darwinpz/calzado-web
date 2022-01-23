const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre: {type: String},
    descripcion: {type: String},
    foto: {type: String},
    stock:{type: Number,default:0},
    precio:{type: Number},
    views: {type: Number,default: 0},
    likes: {type: Number, default: 0},
    categorias: {type: String},
    colores: {type: String},
    tallas: {type: String},
    creacion: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Producto',ProductoSchema);