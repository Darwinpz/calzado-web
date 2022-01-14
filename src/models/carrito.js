const mongoose = require('mongoose');

const {Schema} = mongoose;
const {ObjectId} = Schema;

const CarritoSchema = new Schema({

    producto_id:{type: ObjectId},
    cantidad:{type: Number,default:1},
    creacion: {type: Date, default: Date.now},
    usuario_id: { type: ObjectId , ref: 'User'},

});


module.exports = mongoose.model('Carrito', CarritoSchema);