const ctrl = {};

const Producto = require('../models/productos');
const Categoria = require('../models/categorias');
const User = require('../models/user');
const Pedido = require("../models/pedidos");
const Calendario = require("../models/calendario");

ctrl.index = async (req, res) => {

    meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const count_usuarios = await User.count({ 'tipo': 'CLIENTE' });

    const count_productos = await Producto.count();

    const count_categorias = await Categoria.count();

    const top5_prod = await Producto.find().sort({ "views": "desc" }).limit(5).select("nombre views");

    const ver_totales = await Pedido.find().sort({ "total": "desc" }).populate("usuario_id").limit(5).select("genero estado correo total");

    var top5_users = await Pedido.aggregate([
        {

            "$group": {
                "_id": "$usuario_id",
                "total": { "$sum": "$total" }
            }

        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'usuario'
            }
        },
        { "$sort": { "creacion": -1 } }

    ]).limit(5)

    const ventas = await Pedido.find({ "estado": "APROBADO" }).sort({ "total": "asc" })

    var valores1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var encabezado1 = meses

    var valores2 = []
    var encabezado2 = []

    var valores3 = []
    var encabezado3 = []

    var total_ventas = 0
    var cant_ventas_pendientes = 0
    var total_ventas_pendientes = 0

    for (v of ventas) {

        var fecha = new Date(v.creacion)

        valores1[fecha.getMonth()] += v.total

    }

    for (p of top5_prod) {
        valores2.push(p.views)
        encabezado2.push(p.nombre)
    }

    for (u of ver_totales) {

        if (u.estado != "APROBADO") {
            cant_ventas_pendientes += 1
            total_ventas_pendientes += u.total

        } else {

            total_ventas += u.total

        }
    }

    for (t of top5_users) {
        valores3.push(t.total)
        encabezado3.push(t.usuario[0].correo)
    }

    const calendario = await Calendario.find();

    var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

    res.render('administrador/reportes/index.hbs', { user: req.session, calendario, pedido_count, total_ventas, total_ventas_pendientes, cant_ventas_pendientes, count_usuarios, count_productos, count_categorias, valores1, encabezado1, valores2, encabezado2, valores3, encabezado3 })

};


ctrl.clientes = async (req, res) => {

    var valores2 = [0, 0, 0]
    var valores1 = [0, 0, 0]
    var encabezado2 = ["MASCULINO", "FEMENINO", "OTRO"]

    const usuarios = await User.find({ 'tipo': 'CLIENTE' });

    const ver_totales = await Pedido.find().sort({ "total": "desc" }).populate("usuario_id").limit(5).select("genero estado correo total");

    for (u of ver_totales) {

        if (u.estado == "APROBADO") {
            valores2[encabezado2.indexOf(u.usuario_id.genero)] += 1
        }
    }

    for (v of usuarios) {

        valores1[encabezado2.indexOf(v.genero)] += 1

    }

    var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })


    res.render('administrador/reportes/clientes.hbs', { user: req.session,pedido_count, valores1, encabezado1: encabezado2, valores2, encabezado2 })

}


ctrl.productos = async (req, res) => {

    const valores1 = []
    const encabezado1 = []
    const valores2 = []
    const encabezado2 = []
    const valores3 = []
    const encabezado3 = []

    const top10_prod = await Producto.find().sort({ "views": "desc" }).limit(10).select("nombre views");

    const top10_likes = await Producto.find().sort().limit(10);

    var top10_ped = await Pedido.find().limit(10)

    for (p of top10_ped) {

        for (i of p.items) {

            encabezado1.push(i.producto)
            valores1.push(i.precio)

        }

    }

    for (p of top10_prod) {
        valores2.push(p.views)
        encabezado2.push(p.nombre)
    }

    const new_encabezado1 = [...new Set(encabezado1)]
    var new_valores1 = []

    var i = 0;

    for(en of encabezado1){
        
        var pos = new_encabezado1.indexOf(en)
        
        if (new_valores1[pos] == null){
            new_valores1[pos] = 0
        }
        new_valores1[pos] += parseFloat(valores1[i])
        i++

    }

    for (p of top10_likes) {

        encabezado3.push(p.nombre)

        valores3.push(p.likes.length)
        
    }

    var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })


    res.render('administrador/reportes/productos.hbs', { user: req.session, pedido_count, valores1: new_valores1, encabezado1:new_encabezado1, valores2, encabezado2, valores3, encabezado3 })

}


module.exports = ctrl;