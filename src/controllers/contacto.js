const User = require('../models/user');
var transporter = require('./Mailer');
const Pedido = require("../models/pedidos")

const ctrl = {};

const accountSid = 'AC0c629bdc8869ef8e831cbbaa89c899b5';
const authToken = '0e2d86f62c074ca719151f3549eba7e1';
const twilio = require('twilio')

const client = new twilio(accountSid, authToken);


const Carrito = require('../models/carrito')

ctrl.index = async (req, res) => {

  const carrito_count = await Carrito.count({ 'usuario_id': req.session._id })

  var pedido_count = 0

  if (req.session.tipo == "ADMINISTRADOR") {
    pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })
  } else {
    pedido_count = await Pedido.count({ 'usuario_id': req.session._id })
  }

  res.render('contacto.hbs', { user: req.session, carrito_count, pedido_count })

};

ctrl.contactcentercorreo = async (req, res) => {

  var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

  res.render('administrador/contactcentercorreo.hbs', { user: req.session, pedido_count })

};

ctrl.enviarwhatsapp = async (req, res) => {


  const { numero, mensaje } = req.body

  var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

  client.messages.create({
    body: mensaje,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+593'+numero.substring(1)
  }).then(message => console.log(message.sid)) 
  .done();
  
  res.render('administrador/contactcenterwhatsapp.hbs', { success_msg: "Mensaje enviado satisfactoriamente", user: req.session, pedido_count })

}

ctrl.contactcenterwhatsapp = async (req, res) => {

  var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

  res.render('administrador/contactcenterwhatsapp.hbs', { user: req.session, pedido_count })

};

ctrl.enviarcorreo = async (req, res) => {
  let data = req.body;
  var clientes = await User.find();

  clientes.forEach(async elemento => {
    console.log(elemento.correo);
    try {
      await transporter.sendMail({
        from: 'Calzado Ivan La Febre" <calzadoivanlafebre@gmail.com>', // sender address
        to: elemento.correo, // list of receivers
        subject: data.asunto, // Subject line
        text: "Hello world?", // plain text body
        html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                <tr>
                  <td style="background-color: #ecf0f1">
                    <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                      <h2 style="color: #e67e22; margin: 0 0 7px">HOLA ${elemento.nombres}</h2>
                      <p style="margin: 2px; font-size: 15px">
                        La familia que conforma Calzado Ivan La Febre te agradece por preferirnos, y deseamos que tu experiencia con nuestro sitio web sea la mejor.</p></br>
                       
                      <p style="margin: 2px; font-size: 15px">
                      ${data.message}</p>
                      <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
                        <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="${data.enlace}">clic aqui</a>	
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


  });

  res.render('administrador/contactcentercorreo.hbs', { user: req.session })

}

module.exports = ctrl;