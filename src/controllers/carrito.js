const ctrl = {};

const Producto = require('../models/productos');
const Carrito = require('../models/carrito');
const Pedido = require("../models/pedidos");

ctrl.index = async (req,res)=>{

    const carrito = await Carrito.find({'usuario_id':req.session._id}).populate('producto','nombre foto') ;

    var total = carrito.map((e)=>e.item.precio*e.cantidad).reduce((prev, curr) => prev + curr, 0);

    const carrito_count = await Carrito.count({'usuario_id':req.session._id});

    const pedido_count = await Pedido.count({'usuario_id':req.session._id});

    res.render("carrito.hbs", {user:req.session, carrito, total, carrito_count, pedido_count})

};  


ctrl.add = async (req, res) => {

    const producto = await Producto.findOne({'_id':req.body.id});

    if(producto){

        var obj = producto.items.find(i=> i.talla == req.body.talla && i.color == req.body.color)

        if(obj.stock > 0 && obj.stock >= parseInt(req.body.cantidad)){

            const newCarrito = new Carrito({

                producto: req.body.id,
                cantidad: req.body.cantidad,
                usuario_id: req.body.usuario,
                item: obj
            })

            await newCarrito.save();

            res.json(true); 

        }else{

            res.json(false); 

        }

    }


};


ctrl.eliminar = async (req, res) => {

    const carrito = await Carrito.findOne({ '_id': req.body.id });

    if (carrito) {

        await carrito.remove();

        res.json(true);

    } else {

        res.json(false);

    }

}

ctrl.pedir = async (req, res) => {

    var items_carrito = []

    const carrito = await Carrito.find({'usuario_id':req.session._id}).populate('producto','nombre foto') ;
    
    var total = carrito.map((e)=>e.item.precio*e.cantidad).reduce((prev, curr) => prev + curr, 0);


    for(c of carrito){

        var obj = {"producto":c.producto.nombre, "cantidad":c.cantidad, "precio":c.item.precio, "color":c.item.color, "talla":c.item.talla, "foto":c.producto.foto}

        items_carrito.push(obj)

    }

    const pedido = new Pedido({

        items: items_carrito,
        total:  total,
        usuario_id: req.session._id
    });

    await pedido.save();

    await Carrito.remove({'usuario_id':req.session._id}).exec(); 

    res.redirect('/pedidos')

}

module.exports = ctrl;