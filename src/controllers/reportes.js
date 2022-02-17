const ctrl = {};

const Producto = require('../models/productos');
const Categoria = require('../models/categorias');
const User = require('../models/user');
const Pedido = require("../models/pedidos");

ctrl.index = async (req,res)=>{

    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre", "Noviembre","Diciembre"]

    const count_usuarios = await User.count({'tipo':'CLIENTE'});

    const count_productos = await Producto.count();

    const count_categorias = await Categoria.count();

    const top5_prod =  await Producto.find().sort({"views": "desc"}).limit(5).select("nombre views");

    const top5_users =  await Pedido.find().sort({"total": "desc"}).populate("usuario_id").limit(5).select("genero estado correo total");

    const ventas = await Pedido.find({"estado":"APROBADO"}).sort({"total": "asc"})   

    var valores1 = [0,0,0,0,0,0,0,0,0,0,0,0]
    var encabezado1 = meses

    var valores2 = []
    var encabezado2 = []

    var valores3 = []
    var encabezado3 = []

    var valores4 = [0,0,0]
    var encabezado4 = ["MASCULINO", "FEMENINO","OTRO"]
    
    var total_ventas = 0
    var cant_ventas_pendientes = 0
    var total_ventas_pendientes = 0

    for (v of ventas){

        var fecha = new Date(v.creacion)

        valores1[fecha.getMonth()] += v.total

    }

    for(p of top5_prod){
        valores2.push(p.views)
        encabezado2.push(p.nombre)
    }

    for(u of top5_users){
        valores3.push(u.total)
        encabezado3.push(u.usuario_id.correo)

        if(u.estado != "APROBADO"){
            cant_ventas_pendientes +=1
            total_ventas_pendientes += u.total

        }else{

            total_ventas += u.total

            valores4[encabezado4.indexOf(u.usuario_id.genero)] += 1

        }
    } 

    console.log(valores4)

    var pedido_count = pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})
    
    res.render('administrador/reportes.hbs',  {user: req.session, pedido_count, total_ventas, total_ventas_pendientes, cant_ventas_pendientes, count_usuarios,count_productos, count_categorias, valores1,encabezado1, valores2, encabezado2, valores3, encabezado3 , valores4, encabezado4})

};



module.exports = ctrl;