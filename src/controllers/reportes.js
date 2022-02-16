const ctrl = {};

const Producto = require('../models/productos');
const Categoria = require('../models/categorias');
const User = require('../models/user');
const Pedido = require("../models/pedidos");

ctrl.index = async (req,res)=>{

    const count_usuarios = await User.count({'tipo':'CLIENTE'});

    const count_productos = await Producto.count();

    const count_categorias = await Categoria.count();

    const top5_prod =  await Producto.find().sort({"views": "desc"}).limit(5).select("nombre views");

    const top5_users =  await Pedido.find().sort({"total": "desc"}).populate("usuario_id").limit(5).select("correo total");

    var valores1 = []
    var encabezado1 = []

    var valores2 = []
    var encabezado2 = []

    for(p of top5_prod){
        valores1.push(p.views)
        encabezado1.push(p.nombre)
    }

    for(u of top5_users){
        valores2.push(u.total)
        encabezado2.push(u.usuario_id.correo)
    }

    const cant_ventas = valores2.reduce((prev,sigu)=> prev+sigu,0);

    res.render('administrador/reportes.hbs',  {user: req.session, cant_ventas, count_usuarios,count_productos, count_categorias, valores1,encabezado1, valores2, encabezado2 })

};



module.exports = ctrl;