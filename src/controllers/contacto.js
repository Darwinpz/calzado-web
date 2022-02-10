const ctrl = {};


const Carrito = require('../models/carrito')

ctrl.index = async (req,res)=>{

    const carrito_count = await Carrito.find({'usuario_id':req.session._id})

    res.render('contacto.hbs',  {user: req.session, carrito_count: carrito_count.length})

};

ctrl.contactcenter = async (req,res)=>{


    res.render('administrador/contactcenter.hbs',  {user: req.session})

};


module.exports = ctrl;