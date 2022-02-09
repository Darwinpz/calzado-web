
const Producto = require('../models/productos');
const Categoria = require('../models/categorias');
const fs = require('fs-extra');
const path = require('path');

const ctrl = {};

ctrl.eliminar_foto = async (req, res) => {

    const producto = await Producto.findOne({ '_id': req.body.id });

    if (producto) {
      
        producto.foto = producto.foto.filter(f => f != req.body.foto);

        const targetPath = path.resolve('src/public/img/products/' + req.body.foto);

        await fs.unlink(targetPath);

        await producto.save();

        res.json(true);

    } else {

        res.json(false);

    }

}


ctrl.upload_foto = async (req, res) => {

    for (const file of req.files) {

        //const imageTempPath = file.path;

        const extension = path.extname(file.originalname).toLowerCase();

        //const targetPath = path.resolve('src/public/img/products/' + file.filename);

        if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {

            //await fs.rename(imageTempPath, targetPath);

            res.status(200).json(file.filename);

        } else {

            await fs.unlink(file.path);

            res.status(500).json("Error al Guardar");

        }


    }


}


ctrl.buscar_tallas = async (req, res) => {

    const producto = await Producto.findOne({ '_id': req.body.id });

    if (producto) {

        var obj = []

        if(req.body.color!=null){

            obj = producto.items.find(i=> i.talla == req.body.talla && i.color == req.body.color)

        }else{
            obj = producto.items.filter(i=> i.talla == req.body.talla)

        }
    
        
        res.json(obj)

    } else {

        res.json(false);

    }


}

module.exports = ctrl;