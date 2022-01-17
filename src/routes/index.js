const usuarios = require("../controllers/usuarios");
const ofertas = require("../controllers/ofertas");
const damas = require("../controllers/damas");
const contacto = require("../controllers/contacto");
const catalogo = require("../controllers/catalogo");
const caballeros = require("../controllers/caballeros");
const categorias = require("../controllers/categorias");

const { isAuthenticated, notAuthenticated } = require('../helpers/auth');


module.exports = (app) => {

    app.get('/', (req,res)=>{
        
        res.render("index.hbs", {user:req.session})

    });

    app.get('/administrar', (req,res)=>{
        
        res.render("administrador/index.hbs", {user:req.session})

    });

    app.get('/administrar/usuarios', usuarios.all);
    app.delete('/administrar/usuarios', usuarios.eliminar);
    app.get('/administrar/usuarios/:id', usuarios.ver);
    app.post('/administrar/usuarios/:id', usuarios.actualizar);

    app.get('/administrar/categorias', categorias.index);
    app.post('/administrar/categorias', categorias.add);
    app.delete('/administrar/categorias', categorias.eliminar);
    
    app.get('/login',notAuthenticated ,usuarios.login);
    app.post('/login',notAuthenticated,usuarios.ingresar);
    app.get('/registro',notAuthenticated,usuarios.registro);
    app.post('/registro',notAuthenticated, usuarios.guardar);
    app.get('/logout',isAuthenticated, usuarios.logout);
    
    app.get('/catalogo', catalogo.index );
    app.get('/ofertas', ofertas.index);
    app.get('/caballeros', caballeros.index);
    app.get('/damas', damas.index);
    app.get('/contacto', contacto.index);

    app.get('/perfil',isAuthenticated,usuarios.perfil);
    app.post('/perfil',isAuthenticated,usuarios.actualizar);
    app.get('/carrito',isAuthenticated,usuarios.carrito);

}