
const User = require('../models/user');
const Carrito = require('../models/carrito');
var jwt = require('../helpers/jwt');
var transporter = require('./Mailer');
var transporter1 = require('./Mailercontacto');
var jwts =  require('jwt-simple');
const bcrypt = require('bcryptjs');
const Pedido = require("../models/pedidos");

var secret = process.env.SECRET

const ctrl = {};


ctrl.login = async (req,res)=>{

    if(req.session._id == null){

        res.render("login.hbs")

    }else{
        
        res.redirect("/")
    }

};

ctrl.ingresar = async (req, res) => {

    const { identificacion, clave } = req.body;

    const user = await User.findOne({ $or: [{ 'cedula': identificacion }, { 'correo': identificacion }] });

    if (user) {

        if (await user.matchPassword(clave)) {

            req.session._id = user._id;
            req.session.cedula = user.cedula;
            req.session.tipo = user.tipo;

            res.redirect("/");

        } else {

            res.render('login.hbs', { error_msg: [{ text: "Usuario o Clave Incorrecto" }], usuario: req.body });

        }

    } else {

        res.render('login.hbs', { error_msg: [{ text: 'Usuario no encontrado' }], usuario: req.body });

    }


}

ctrl.recuperarcuenta = async (req,res)=>{

    if(req.session._id == null){

        res.render("recuperarcuenta.hbs")

    }else{
        
        res.redirect("/")
    }

};

ctrl.enviarcorreo = async (req,res)=>{

    if(req.session._id == null){
        let data = req.body;
        var cliente_buscado = await User.findOne({correo: data.identificacion});
        if(cliente_buscado != null) {
            var token = jwt.createTokenRecuperar(cliente_buscado);
            try{
                await transporter.sendMail({
                    from: 'Calzado Ivan La Febre" <calzadoivanlafebre@gmail.com>', // sender address
                    to: cliente_buscado.correo, // list of receivers
                    subject: "Recuperar contraseña", // Subject line
                    text: "Hello world?", // plain text body
                    html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                    <tr>
                      <td style="background-color: #ecf0f1">
                        <div style="color: #34495e; margin: 4% 10% 2%; text-align: justify;font-family: sans-serif">
                          <h2 style="color: #e67e22; margin: 0 0 7px">HOLA ${cliente_buscado.nombres}</h2>
                          <p style="margin: 2px; font-size: 15px">
                            La familia que conforma Calzado Ivan La Febre te agradece por preferirnos, y deseamos que tu experiencia con nuestro sitio web sea la mejor.</p></br>
                          <p style="margin: 2px; font-size: 15px">
                            Tú solicitud de Recuperar Contraseña ha sido aceptada</p>
                          <p style="margin: 2px; font-size: 15px">
                            LA DURACIÓN DE ESTE ENLACE ES DE 15 MINUTOS, PASADO ESTE TIEMPO DEBERA GENRAR UN NUEVO ENLACE</p>
                          <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
                            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #3498db" href="http://localhost:3000/cambiarpassword/${token}">CLIC AQUÍ</a>	
                          </div>
                          <p style="color: #b3b3b3; font-size: 12px; text-align: center;margin: 30px 0 0">Calzado Ivan La Febre</p>
                        </div>
                      </td>
                    </tr>
                  </table>`, // html body
                  });                  
            }catch (e) {
                console.log(e);
            }
            res.render("recuperarcuenta.hbs",  { success_msg: "Correo electrónico enviado satisfactoriamente"});
        }
    }else{
        
        res.redirect("/")
    }

};



ctrl.sugerencia = async (req,res)=>{
    let data = req.body;
            try{
                await transporter1.sendMail({
                    from: 'Contacto Calzado Ivan La Febre" <contactocalzadoivanlafebre@gmail.com>', // sender address
                    to: '<calzadoivanlafebre@gmail.com>', // list of receivers
                    subject:  req.body.subject, // Subject line
                    text: "Hello world?", // plain text body
                    html: `<table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                     
                  </table>`, // html body
                  });                  
            }catch (e) {
                console.log(e);
            }
            res.render("contacto.hbs",  { success_msg: "Correo electrónico enviado satisfactoriamente"});
         

};



ctrl.cambiarpassword = async (req,res)=>{
    if(req.session._id == null){
        token = req.params.token;
        res.render("cambiarpassword.hbs",{token:token});
    }else{
        
        res.redirect("/")
    }
}

ctrl.cambiarpasswordBD = async (req,res)=>{
    if(req.session._id == null){
        try{
            token = req.params.token;
            const { clave, confirm_clave } = req.body;
            var payload = jwts.decode(token,secret);
            var id = payload.sub;

            if (clave != confirm_clave) {
                res.render("cambiarpassword.hbs", { error_msg: [{ text: "Las constraseñas ingresadas no coinciden" }], token:token });
        
            }else{
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(clave, salt);
                var reg = await User.findByIdAndUpdate({_id:id},{
                    clave: hash
                });
                res.redirect('/login');
            }
        }catch(e){
            res.render("cambiarpassword.hbs", { error_msg: [{ text: "El token ya expiro" }], token:token });
        }        
    }else{
        
        res.redirect("/")
    }
}



ctrl.registro = async (req,res)=>{

    if(req.session._id == null){

        res.render("registro.hbs")

    }else{
        
        res.redirect("/")
    }

};

ctrl.guardar = async (req,res)=>{

    const { cedula, nombres, apellidos, genero, correo, telefono, clave, confirm_clave } = req.body;

    const errores = [];

    if (clave != confirm_clave) {

        errores.push({ text: 'Las claves NO coinciden' })

    }

    const exist = await User.findOne({ $or: [{ 'cedula': cedula },{ 'correo': correo }] });

    if (exist) {

        errores.push({ text: 'Cédula o Correo ya existente' })

    }

    const newUser = new User({
        cedula,
        nombres: nombres.toUpperCase(),
        apellidos: apellidos.toUpperCase(),
        genero,
        correo,
        telefono,
        clave,
        tipo: "CLIENTE"
    });

    newUser.clave = await newUser.encryptPassword(clave);
    await newUser.save();

    res.redirect("/administrar/productos");

};


ctrl.perfil = async (req,res)=>{

    const usuario = await User.findOne({ '_id': req.session._id }).select("-clave");

    const carrito_count = await Carrito.count({'usuario_id':req.session._id})

    var pedido_count = 0

    if(req.session.tipo == "ADMINISTRADOR"){
        pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})
    }else{
        pedido_count = await Pedido.count({'usuario_id':req.session._id})
    }

    res.render("perfil.hbs", {user:req.session, usuario, carrito_count, pedido_count})

};

ctrl.actualizar = async (req,res)=>{

    const { cedula, nombres, apellidos, genero, correo, telefono } = req.body;

    var usuario;

    if(req.params.id){

        usuario = await User.findOne({ '_id': req.params.id }).select("-clave");

    }else{

        usuario = await User.findOne({ '_id': req.session._id }).select("-clave");

    }
    
    if (usuario) {

        const validar = await User.find({ $or: [{ 'cedula': cedula }, { 'correo': correo }] });

        if (validar.length > 1) {

            res.render('perfil.hbs', { error_msg: [{ text: 'Datos de usuario existentes' }], usuario });

        } else {

            usuario.cedula = cedula;
            usuario.nombres = nombres.toUpperCase();
            usuario.apellidos = apellidos.toUpperCase();
            usuario.genero = genero;
            usuario.correo = correo;
            usuario.telefono = telefono;
            
            await usuario.save();

            res.render('perfil.hbs', { success_msg: "Actualizado Correctamente", user:req.session, usuario })

        }

    } else {

        res.render('perfil.hbs', { error_msg: [{ text: 'Error al actualizar' }], user:req.session, usuario });

    }

};


ctrl.all = async (req,res)=>{

    const usuarios = await User.find({ $nor: [{'_id':req.session._id}]}).select("-clave");

    var pedido_count = pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})

    res.render("administrador/usuarios.hbs", {user:req.session,pedido_count ,usuarios})

};

ctrl.ver = async (req,res)=>{

    const id = req.params.id

    const usuario = await User.findOne({'_id':id}).select("-clave");

    var pedido_count = pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})

    res.render("perfil.hbs", {user:req.session, pedido_count, usuario})

};

ctrl.eliminar = async (req, res) => {

    const user = await User.findOne({ 'cedula': req.body.cedula }).select("-clave");

    if (user) {

        await user.remove();

        res.json(true);

    } else {

        res.json(false);

    }

}

ctrl.logout = async (req,res)=>{

    req.session.destroy();
    res.redirect('/');

};



module.exports = ctrl;