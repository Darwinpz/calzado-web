const ctrl = {};


const Producto = require('../models/productos');
const Carrito = require('../models/carrito');

ctrl.inicio = async (req,res)=>{

    const ofertas = await Producto.find({"categorias":{$regex:"ofertas", $options: 'i'}}).sort({"creacion": "asc"}).limit(4);

    const damas = await Producto.find({"categorias":{$regex:"damas", $options: 'i'}}).sort({"creacion": "asc"}).limit(4);

    const caballeros = await Producto.find({"categorias":{$regex:"caballeros", $options: 'i'}}).sort({"creacion": "asc"}).limit(4);

    const carrito_count = await Carrito.find({'usuario_id':req.session._id})

    res.render("index.hbs", {user:req.session, ofertas, damas, caballeros, carrito_count: carrito_count.length})

};

ctrl.administrar = (req,res)=>{

    res.render("administrador/index.hbs", {user:req.session})

};

module.exports = ctrl;