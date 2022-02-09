const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const CarritoSchema = new Schema({

    producto: { type: ObjectId, ref: 'Producto' },
    item: { type: {} },
    cantidad: { type: Number, default: 1 },
    creacion: { type: Date, default: Date.now },
    usuario_id: { type: ObjectId, ref: 'User' },

});


CarritoSchema.virtual('total')
 .get(function(){
    return this.cantidad * this.item.precio;
});

module.exports = mongoose.model('Carrito', CarritoSchema);