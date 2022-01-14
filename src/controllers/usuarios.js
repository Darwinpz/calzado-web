
const User = require('../models/user');
const ctrl_user = {};

ctrl_user.login = async (req,res)=>{

    if(req.session._id == null){

        res.render("login.hbs")

    }else{
        
        res.redirect("/")
    }

};

ctrl_user.ingresar = async (req, res) => {

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

ctrl_user.registro = async (req,res)=>{

    if(req.session._id == null){

        res.render("registro.hbs")

    }else{
        
        res.redirect("/")
    }

};

ctrl_user.guardar = async (req,res)=>{

    const { cedula, nombres, apellidos, genero, correo, telefono, clave, confirm_clave } = req.body;

    const errores = [];

    if (clave != confirm_clave) {

        errores.push({ text: 'Las claves NO coinciden' })

    }

    const exist = await User.findOne({ $or: [{ 'cedula': cedula },{ 'correo': correo }] });

    if (exist) {

        errores.push({ text: 'Cédula o Correo ya existente' })

    }

    if (errores.length == 0) {

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

        res.render('registro.hbs', { success_msg: "Usuario Creado Correctamente" })

    } else {

        res.render('registro.hbs', { error_msg: errores, usuario: req.body })

    }

};


ctrl_user.perfil = async (req,res)=>{

    const usuario = await User.findOne({ '_id': req.session._id }).select("-clave");
        
    res.render("perfil.hbs", {user:req.session, usuario})

};

ctrl_user.actualizar = async (req,res)=>{

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


ctrl_user.carrito = async (req,res)=>{

    res.render("carrito.hbs", {user:req.session})

};  


ctrl_user.all = async (req,res)=>{

    const usuarios = await User.find({ $nor: [{'_id':req.session._id}]}).select("-clave");

    res.render("administrador/usuarios.hbs", {user:req.session, usuarios})

};

ctrl_user.ver = async (req,res)=>{

    const id = req.params.id

    const usuario = await User.findOne({'_id':id}).select("-clave");

    res.render("perfil.hbs", {user:req.session, usuario})

};

ctrl_user.eliminar = async (req, res) => {

    const user = await User.findOne({ 'cedula': req.body.cedula }).select("-clave");

    if (user) {

        await user.remove();

        res.json(true);

    } else {

        res.json(false);

    }

}

ctrl_user.logout = async (req,res)=>{

    req.session.destroy();
    res.redirect('/');

};



module.exports = ctrl_user;