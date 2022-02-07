const Categoria = require('../models/categorias');
const Producto = require('../models/productos');

const ctrl = {};

ctrl.index = async (req,res)=>{
    
    const categorias = await Categoria.find();

    const productos = await Producto.find({"categorias":{$regex:"caballeros", $options: 'i'}});

    res.render('caballeros.hbs', {user: req.session, categorias, productos})

};

module.exports = ctrl;