
const Categoria = require('../models/categorias');
const Carrito = require('../models/carrito');
const Producto = require('../models/productos');
const Pedido = require("../models/pedidos");

const ctrl = {};

ctrl.index = async (req,res)=>{

    const categorias = await Categoria.find({$nor:[{"nombre":"OFERTAS"}]});

    const productos = await Producto.find({"categorias":{$regex:"ofertas", $options: 'i'}});

    const carrito_count = await Carrito.count({'usuario_id':req.session._id})

    var pedido_count = 0

    if(req.session.tipo == "ADMINISTRADOR"){
        pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})
    }else{
        pedido_count = await Pedido.count({'usuario_id':req.session._id})
    }

    res.render('ofertas.hbs', {user: req.session, categorias, productos, carrito_count, pedido_count})

};

ctrl.filtro = async (req,res)=>{

    campos = (req.params.campos).split("&")

    f_categoria = ""

    f_talla = ""

    f_precio = ""

    for(var c of campos){

        if (c.includes("categoria")){
            f_categoria = c.split("=")[1]
        }

        if(c.includes("talla")){
            f_talla = c.split("=")[1]
        }

        if(c.includes("precio")){
            f_precio = c.split("=")[1]
        }

    }   

    const categorias = await Categoria.find({$nor:[{"nombre":"OFERTAS"}]});

    var productos = await Producto.find({$or:[{"categorias":{$regex:"ofertas", $options: 'i'}}]});

    if (campos !=""){

        var result = []
        
        if(f_categoria== ""){
            f_categoria = "OFERTAS"
        }

        for(p of productos){
        
           if (p.categorias.includes(f_categoria.toUpperCase()) && p.items.filter(t =>t.talla.includes(f_talla) && f_precio <= t.precio).length>0){

                result.push(p)

           }
    
        }


        productos = result
    
    }
    
    const carrito_count = await Carrito.count({'usuario_id':req.session._id})

    res.render('ofertas.hbs', {user: req.session, categorias, productos, carrito_count})


}

module.exports = ctrl;