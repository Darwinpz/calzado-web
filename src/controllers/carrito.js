const ctrl = {};

const Producto = require('../models/productos');
const Carrito = require('../models/carrito');
const Pedido = require("../models/pedidos");
const User = require("../models/user");
var transporter = require('./Mailer');

ctrl.index = async (req, res) => {

    const carrito = await Carrito.find({ 'usuario_id': req.session._id }).populate('producto', 'nombre foto');

    var total = carrito.map((e) => e.item.precio * e.cantidad).reduce((prev, curr) => prev + curr, 0);

    const carrito_count = await Carrito.count({ 'usuario_id': req.session._id });

    const pedido_count = await Pedido.count({ 'usuario_id': req.session._id });

    res.render("carrito.hbs", { user: req.session, carrito, total, carrito_count, pedido_count })

};


ctrl.add = async (req, res) => {

    const producto = await Producto.findOne({ '_id': req.body.id });

    if (producto) {

        var obj = producto.items.find(i => i.talla == req.body.talla && i.color == req.body.color)

        if (obj.stock > 0 && obj.stock >= parseInt(req.body.cantidad)) {

            const newCarrito = new Carrito({

                producto: req.body.id,
                cantidad: req.body.cantidad,
                usuario_id: req.body.usuario,
                item: obj
            })

            await newCarrito.save();

            res.json(true);

        } else {

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

    const carrito = await Carrito.find({ 'usuario_id': req.session._id }).populate('producto', 'nombre foto');

    var total = carrito.map((e) => e.item.precio * e.cantidad).reduce((prev, curr) => prev + curr, 0);


    for (c of carrito) {

        var obj = { "producto": c.producto.nombre, "cantidad": c.cantidad, "precio": c.item.precio, "color": c.item.color, "talla": c.item.talla, "foto": c.producto.foto }

        items_carrito.push(obj)

    }

    const pedido = new Pedido({

        items: items_carrito,
        total: total,
        usuario_id: req.session._id
    });

    await pedido.save();

    await Carrito.remove({ 'usuario_id': req.session._id }).exec();

    var cliente_buscado = await User.findOne({"correo": req.session.correo});

    try {
        await transporter.sendMail({
            from: 'Calzado Ivan La Febre" <calzadoivanlafebre@gmail.com>', // sender address
            to: cliente_buscado.correo, // list of receivers
            subject: "Pedido N°: "+pedido._id+" -EN VERIFICACIÓN-", // Subject line
            text: "Hello world?", // plain text body
            html: `<table style="max-width: 100%; padding: 10px; margin:0 auto; border-collapse: collapse;">
            <tr>
              <td style="background-color: #ecf0f1">
                <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                  <h2 style="color: #e67e22; margin: 0 0 7px">HOLA ${cliente_buscado.nombres}</h2>
                  <p style="margin: 2px; font-size: 15px">
                    La familia que conforma Calzado Ivan La Febre te agradece por preferirnos, y deseamos que tu experiencia con nuestro sitio web sea la mejor.</p></br>
                    <h4 class="text-center" style="text-align: center;"><strong>DETALLE DEL PEDIDO</strong></h4>
                    <table style="width: 100%; padding: 5px; margin:0 auto; border-collapse: collapse;">
                        <thead>
                            <tr>
                            <th class="text-center" scope="col">Cantidad</th>
                            <th class="text-center" scope="col">Producto</th>
                            <th class="text-center" scope="col">foto</th>
                            <th class="text-center" scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            ${items_carrito.map(({cantidad,producto,color,talla,foto,precio})=>
                                `<tr>
                                <td>x${cantidad}</td>
                                <td><strong>Modelo:</strong> ${producto} - <strong>Color:</strong> ${color} - <strong>Talla:</strong> ${talla}</td>
                                <td><img style="height: 50px; width: 100px; max-height: 50px; max-width: 100px;" src="http://calzado-web.herokuapp.com/img/products/${foto[0]}"></td>
                                <td>$ ${precio}</td>
                                </tr>`
                                )
                            }
                            
                        </tbody>    

                    </table>

                    <div class="row text-end">
                        <div class="col">
                            <span><strong>Total del Pedido: </strong>$ ${total}</span>
                        </div>
                    </div>
                    
                    <h4 class="text-center" style="text-align: center;color: orange;"><strong>VERIFICACIÓN</strong></h4>

                    <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="http://calzado-web.herokuapp.com/">Ingresar Al Sitio</a>	
                  </div>
                  <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Calzado Ivan La Febre</p>
                </div>
              </td>
            </tr>
          </table>`, // html body
        });
    } catch (e) {
        console.log(e);
    }

    res.redirect('/pedidos')

}

module.exports = ctrl;