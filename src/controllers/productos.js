const Producto = require('../models/productos');
const Categoria = require('../models/categorias');
const fs = require('fs-extra');
const path = require('path');
const categorias = require('../models/categorias');
const Carrito = require('../models/carrito');

const ctrl = {};

ctrl.index = async (req, res) => {

    const productos = await Producto.find();

    res.render('administrador/productos.hbs', { user: req.session, productos })

};


ctrl.ver = async (req, res) => {

    const producto = await Producto.findOne({'_id':req.params.id});

    var tallas = []

    if(producto){

        producto.views = producto.views + 1;

        await producto.save()

        tallas = producto.items.map((i)=> i.talla)

    }

    const carrito_count = await Carrito.find({'usuario_id':req.session._id})


    res.render('producto.hbs', { user: req.session, producto, tallas: [...new Set(tallas)], carrito_count: carrito_count.length})

};


ctrl.edit = async (req, res) => {

    const producto = await Producto.findOne({'_id':req.params.id});
    
    const categorias = await Categoria.find();

    res.render('administrador/productos_edit.hbs', { user: req.session, categorias, producto, items: producto.items})

};

ctrl.update = async (req, res) => {

    const producto = await Producto.findOne({'_id':req.params.id});
    
    const ver_categorias = await Categoria.find();

    const {prod_nombre, prod_descripcion, foto, stock, precio, color, talla, categorias} = req.body;

    var prod_items = []

    for(var i =0; i<=stock.length-1;i++){

        prod_items.push({"stock":stock[i],"precio":precio[i],"color":color[i],"talla":talla[i]})

    }

    producto.nombre = prod_nombre;
    producto.descripcion = prod_descripcion;
    producto.foto = foto;
    producto.categorias = categorias;
    producto.items = prod_items;

    for(var f of foto){

        const imageTempPath = path.resolve('src/temp/' + f);

        if(fs.pathExistsSync(imageTempPath)){

            const targetPath = path.resolve('src/public/img/products/' + f);

            await fs.rename(imageTempPath, targetPath);

        }

    }

    await producto.save();

    res.render('administrador/productos_edit.hbs', { success_msg: "Producto Actualizado Correctamente", user:req.session, categorias:ver_categorias, producto, items: producto.items })


};

ctrl.add = async (req, res) => {

    const categorias = await Categoria.find();

    res.render('administrador/productos_add.hbs', { user: req.session, categorias })

};

ctrl.save = async (req, res) => {

    const {prod_nombre, prod_descripcion, foto, stock, precio, color, talla, categorias} = req.body;

    var prod_items = []

    for(var i =0; i<=stock.length-1;i++){

        prod_items.push({"stock":stock[i],"precio":precio[i],"color":color[i],"talla":talla[i]})

    }

    const newProducto = new Producto({

        nombre: prod_nombre,
        descripcion:prod_descripcion,
        foto: foto,
        categorias: categorias,
        items: prod_items

    })

    for(var f of foto){

        const imageTempPath = path.resolve('src/temp/' + f);

        const targetPath = path.resolve('src/public/img/products/' + f);

        await fs.rename(imageTempPath, targetPath);

    }

    await newProducto.save();

    const ver_categorias = await Categoria.find();

    res.render('administrador/productos_add.hbs', { success_msg: "Producto Agregado Correctamente", user:req.session, categorias:ver_categorias })

};


ctrl.eliminar = async (req, res) => {

    const producto = await Producto.findOne({ '_id': req.body.id });

    if (producto) {

        for (var img of producto.foto){

            await fs.unlink(path.resolve('./src/public/img/products/'+img));
        
        }
        
        await producto.remove();

        res.json(true);

    } else {

        res.json(false);

    }

}

module.exports = ctrl;