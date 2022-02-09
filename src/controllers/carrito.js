const ctrl = {};

const Producto = require('../models/productos');
const Carrito = require('../models/carrito')

ctrl.index = async (req,res)=>{

    const carrito = await Carrito.find({'usuario_id':req.session._id});

    console.log(carrito)

    res.render("carrito.hbs", {user:req.session})

};  


ctrl.add = async (req, res) => {


    const producto = await Producto.findOne({'_id':req.body.id});

    if(producto){

        var obj = producto.items.find(i=> i.talla == req.body.talla && i.color == req.body.color)

        console.log(obj)

        if(obj.stock > 0){

            const newCarrito = new Carrito({

                producto_id: req.body.id,
                cantidad: req.body.cantidad,
                usuario_id: req.body.usuario,
        
            })

            await newCarrito.save();

            res.json(true); 

        }else{

            res.json(false); 

        }

    }


};


module.exports = ctrl;