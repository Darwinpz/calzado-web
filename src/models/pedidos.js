const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const PedidoSchema = new Schema({

    items: { type: [] },
    total: {type: Number},
    estado: {type: String, default: "PENDIENTE"},
    transaccion: {type: String},
    factura:{type: String},
    creacion: { type: Date, default: Date.now },
    usuario_id: { type: ObjectId, ref: 'User' },

});


module.exports = mongoose.model('Pedido', PedidoSchema);