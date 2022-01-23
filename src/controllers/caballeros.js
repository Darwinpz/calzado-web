const Categoria = require('../models/categorias');


const ctrl = {};

ctrl.index = async (req,res)=>{

    const categorias = await Categoria.find();

    res.render('caballeros.hbs', {user: req.session, categorias})

};

module.exports = ctrl;