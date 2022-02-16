const ctrl = {};

const Carrito = require('../models/carrito');
const Pedido = require("../models/pedidos");
const fs = require('fs-extra');
const path = require('path');

ctrl.index = async (req,res)=>{

    const carrito_count = await Carrito.count({'usuario_id':req.session._id});

    const pedido_count = await Pedido.count({'usuario_id':req.session._id});

    const pedidos =  await Pedido.find({'usuario_id':req.session._id});

    res.render("pedidos.hbs", {user:req.session,pedidos, carrito_count, pedido_count})

};  


ctrl.eliminar = async (req, res) => {

    const pedido = await Pedido.findOne({ '_id': req.body.id });

    if (pedido) {

        if(pedido.estado != "APROBADO"){

            await pedido.remove();
            
            ruta = path.resolve('src/public/img/transacciones/' + pedido.transaccion);

            await fs.unlink(ruta);

            res.json({"message":"eliminado","valor":true});

        }else{

            res.json({"message":"El Pedido ya está Aprobado, No se puede Eliminar","valor":false});

        }
       
    } else {

        res.json({"message":"No existe el pedido","valor":false});

    }

}

ctrl.upload_transacciones = async (req, res) => {

    const {id_pedido} = req.body

    for (const file of req.files) {

        const imageTempPath = file.path;

        const extension = path.extname(file.originalname).toLowerCase();

        const targetPath = path.resolve('src/public/img/transacciones/' + file.filename);

        if (extension === '.png' || extension === '.jpg' || extension === '.jpeg') {

            const pedido = await Pedido.findOne({ '_id': id_pedido });

            await fs.rename(imageTempPath, targetPath);

            pedido.transaccion = file.filename;
            pedido.estado = "VERIFICACIÓN"

            await pedido.save();

            res.status(200).json(file.filename);

        } else {

            await fs.unlink(file.path);

            res.status(500).json("Error al Guardar");

        }


    }


}


module.exports = ctrl;