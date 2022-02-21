const ctrl = {};

const Carrito = require('../models/carrito');
const Pedido = require("../models/pedidos");
const fs = require('fs-extra');
const path = require('path');
var transporter = require('./Mailer');
const User = require("../models/user");

ctrl.index = async (req, res) => {

    const carrito_count = await Carrito.count({ 'usuario_id': req.session._id });

    pedido_count = 0

    var pedidos = []

    if (req.session.tipo == "ADMINISTRADOR") {
        pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

        pedidos = await Pedido.find({ "estado": "VERIFICACIÓN" }).populate("usuario_id");

    } else {
        pedido_count = await Pedido.count({ 'usuario_id': req.session._id })

        pedidos = await Pedido.find({ 'usuario_id': req.session._id });
    }


    res.render("pedidos.hbs", { user: req.session, pedidos, carrito_count, pedido_count })

};


ctrl.filtro = async (req, res) => {

    tipo = req.params.tipo;

    const carrito_count = await Carrito.count({ 'usuario_id': req.session._id });

    pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

    var pedidos = await Pedido.find({ "estado": tipo.toUpperCase() }).populate("usuario_id");

    res.render("pedidos.hbs", { user: req.session, pedidos, carrito_count, pedido_count, tipo })


}

ctrl.eliminar = async (req, res) => {

    const pedido = await Pedido.findOne({ '_id': req.body.id });

    if (pedido) {

        if (pedido.estado != "APROBADO") {

            await pedido.remove();

            if (pedido.transaccion) {

                ruta = path.resolve('src/public/img/transacciones/' + pedido.transaccion);

                await fs.unlink(ruta);

            }

            var cliente_buscado = await User.findOne({ "_id": pedido.usuario_id });

            try {
                await transporter.sendMail({
                    from: 'Calzado Ivan La Febre" <calzadoivanlafebre@gmail.com>', // sender address
                    to: cliente_buscado.correo, // list of receivers
                    subject: "Pedido N°: " + pedido._id + " -CANCELADO-", // Subject line
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
                                    ${pedido.items.map(({ cantidad, producto, color, talla, foto, precio }) =>
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
                                    <span><strong>Total del Pedido: </strong>$ ${pedido.total}</span>
                                </div>
                            </div>
                            
                            <h4 class="text-center" style="text-align: center;color: red;"><strong>TU PEDIDO FUÉ CANCELADO</strong></h4>
                            
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

            res.json({ "message": "eliminado", "valor": true });

        } else {

            res.json({ "message": "El Pedido ya está Aprobado, No se puede Eliminar", "valor": false });

        }

    } else {

        res.json({ "message": "No existe el pedido", "valor": false });

    }

}

ctrl.upload_transacciones = async (req, res) => {

    const { id_pedido, tipo } = req.body

    for (const file of req.files) {

        const imageTempPath = file.path;

        const extension = path.extname(file.originalname).toLowerCase();

        const targetPath = path.resolve('src/public/img/' + tipo + '/' + file.filename);

        if (extension === '.pdf' || extension === '.jpg' || extension === '.jpeg') {

            const pedido = await Pedido.findOne({ '_id': id_pedido });

            await fs.rename(imageTempPath, targetPath);

            if (tipo == "facturas") {

                pedido.factura = file.filename;
                pedido.estado = "APROBADO"

                try {

                    var cliente_buscado = await User.findOne({ "_id": pedido.usuario_id });

                    await transporter.sendMail({
                        from: 'Calzado Ivan La Febre" <calzadoivanlafebre@gmail.com>', // sender address
                        to: cliente_buscado.correo, // list of receivers
                        subject: "Pedido N°: " + pedido._id + " -APROBADO-", // Subject line
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
                                        ${pedido.items.map(({ cantidad, producto, color, talla, foto, precio }) =>
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
                                        <span><strong>Total del Pedido: </strong>$ ${pedido.total}</span>
                                    </div>
                                </div>
                                
                                <h4 class="text-center" style="text-align: center;color: green;"><strong>TU PEDIDO FUÉ APROBADO</strong></h4>
                                
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

            } else {

                pedido.transaccion = file.filename;
                pedido.estado = "VERIFICACIÓN"

            }

            await pedido.save();

            res.status(200).json(file.filename);

        } else {

            await fs.unlink(file.path);

            res.status(500).json("Error al Guardar");

        }


    }


}



module.exports = ctrl;