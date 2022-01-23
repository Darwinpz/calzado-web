const Productos = require('../models/productos');


const ctrl = {};

ctrl.index = async (req,res)=>{

    res.render('administrador/productos.hbs',  {user: req.session})

};


ctrl.ver = async (req,res)=>{

    res.render('producto.hbs',  {user: req.session})

};


ctrl.add = async (req,res)=>{

    res.render('administrador/productos_add.hbs',  {user: req.session})

};


module.exports = ctrl;