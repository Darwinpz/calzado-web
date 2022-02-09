const ctrl = {};


const Carrito = require('../models/carrito')

ctrl.index = async (req,res)=>{

    const carrito_count = await Carrito.find({'usuario_id':req.session._id})

    res.render('catalogo.hbs',  {user: req.session, carrito_count: carrito_count.length})

};

module.exports = ctrl;