const Categoria = require('../models/categorias');
const Producto = require('../models/productos');
const Carrito = require('../models/carrito');

const ctrl = {};

ctrl.index = async (req,res)=>{
    
    const categorias = await Categoria.find();

    const productos = await Producto.find({"categorias":{$regex:"caballeros", $options: 'i'}});

    const carrito_count = await Carrito.find({'usuario_id':req.session._id})

    res.render('caballeros.hbs', {user: req.session, categorias, productos, carrito_count: carrito_count.length})

};

module.exports = ctrl;