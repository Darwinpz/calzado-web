const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriaSchema = new Schema({

    nombre: { type: Number, required: true },
    descripcion: { type: String }

});


module.exports = mongoose.model('Categoria', CategoriaSchema);