
const Categoria = require('../models/categorias');

const ctrl = {};

ctrl.index = async (req,res)=>{

    const categorias = await Categoria.find();

    res.render('ofertas.hbs', {user: req.session, categorias})

};

module.exports = ctrl;