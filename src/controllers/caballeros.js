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

ctrl.filtro = async (req,res)=>{

    const {categorias, precios, tallas, colores} = req.params;

    const ver_categorias = await Categoria.find();

    const productos = await Producto.find({$or:[{"categorias":{$regex:"caballeros", $options: 'i'}},{"categorias":{$regex:categorias, $options: 'i'}}]});

    const carrito_count = await Carrito.find({'usuario_id':req.session._id})

    res.render('caballeros.hbs', {user: req.session, categorias:ver_categorias, productos, carrito_count: carrito_count.length})

}

module.exports = ctrl;