const ctrl = {};


const Producto = require('../models/productos');
const Carrito = require('../models/carrito');
const Pedido = require("../models/pedidos");

ctrl.inicio = async (req,res)=>{

    const ofertas = await Producto.find({"categorias":{$regex:"ofertas", $options: 'i'}}).sort({"creacion": "asc"}).limit(4);

    const damas = await Producto.find({"categorias":{$regex:"damas", $options: 'i'}}).sort({"creacion": "asc"}).limit(4);

    const caballeros = await Producto.find({"categorias":{$regex:"caballeros", $options: 'i'}}).sort({"creacion": "asc"}).limit(4);

    const carrito_count = await Carrito.count({'usuario_id':req.session._id})

    var pedido_count = 0

    if(req.session.tipo == "ADMINISTRADOR"){
        pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})
    }else{
        pedido_count = await Pedido.count({'usuario_id':req.session._id})
    }

    res.render("index.hbs", {user:req.session, ofertas, damas, caballeros, carrito_count, pedido_count})

};

ctrl.administrar = async(req,res)=>{

    var pedido_count = pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})

    res.render("administrador/index.hbs", {user:req.session, pedido_count})

};

module.exports = ctrl;