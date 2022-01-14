const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre: {type: String},
    categoria_id: { type: ObjectId , ref: 'Category'},
    descripcion: {type: String},
    filename: {type: String},
    stock:{type: Number,default:0},
    precio:{type: Number},
    views: {type: Number,default: 0},
    likes: {type: Number, default: 0},
    creacion: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Producto',ProductoSchema);