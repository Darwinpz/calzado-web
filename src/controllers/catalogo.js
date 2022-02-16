const ctrl = {};


const Carrito = require('../models/carrito')

const Pedido = require("../models/pedidos")

ctrl.index = async (req,res)=>{

    const carrito_count = await Carrito.count({'usuario_id':req.session._id})
    const pedido_count = await Pedido.count({'usuario_id':req.session._id})


    res.render('catalogo.hbs',  {user: req.session, carrito_count, pedido_count})

};

module.exports = ctrl;