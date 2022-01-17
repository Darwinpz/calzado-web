
const Categoria = require('../models/categorias');


const ctrl = {};

ctrl.index = async (req,res)=>{

    const categorias = await Categoria.find();

    res.render('administrador/categorias.hbs',  {user: req.session, categorias})

};

ctrl.add = async (req,res)=>{

    const { nombre, descripcion } = req.body;

    const errores = [];

    const exist = await Categoria.findOne({'nombre':nombre});

    if (exist) {

        errores.push({ text: 'Esta Categoría ya existe' })

    }

    if (errores.length == 0) {

        const newCategoria = new Categoria({
            nombre: nombre.toUpperCase(),
            descripcion
        });

        await newCategoria.save();

        res.redirect('/administrar/categorias')

    } else {

        res.render('administrador/categorias.hbs', { error_msg: errores, usuario: req.body })

    }

};

ctrl.eliminar = async (req, res) => {

    const categoria = await Categoria.findOne({'nombre': req.body.categoria});

    if (categoria) {

        await categoria.remove();

        res.json(true);

    } else {

        res.json(false);

    }

}

module.exports = ctrl;