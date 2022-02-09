const ctrl = {};

const Producto = require('../models/productos');
const Carrito = require('../models/carrito')

ctrl.index = async (req,res)=>{

    const carrito = await Carrito.find({'usuario_id':req.session._id}).populate('producto','nombre foto') ;

    var total = carrito.map((e)=>e.item.precio*e.cantidad).reduce((prev, curr) => prev + curr, 0);

    res.render("carrito.hbs", {user:req.session, carrito, total})

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


module.exports = ctrl;