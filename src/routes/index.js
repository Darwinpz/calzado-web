const usuarios = require("../controllers/usuarios");
const ofertas = require("../controllers/ofertas");
const damas = require("../controllers/damas");
const contacto = require("../controllers/contacto");
const catalogo = require("../controllers/catalogo");
const caballeros = require("../controllers/caballeros");

module.exports = (app) => {

    app.get('/', (req,res)=>{
        
        res.render("index.hbs", {user:req.session})

    });

    app.get('/login', usuarios.login);
    app.post('/login',usuarios.ingresar);
    app.get('/registro',usuarios.registro);
    app.post('/registro', usuarios.guardar);
    
    app.get('/catalogo', catalogo.index );
    app.get('/ofertas', ofertas.index);
    app.get('/caballeros', caballeros.index);
    app.get('/damas', damas.index);
    app.get('/contacto', contacto.index);

    app.get('/perfil',usuarios.perfil);
    app.post('/perfil',usuarios.actualizar);
    app.get('/carrito',usuarios.carrito);

}