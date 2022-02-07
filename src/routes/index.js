const usuarios = require("../controllers/usuarios");
const ofertas = require("../controllers/ofertas");
const damas = require("../controllers/damas");
const contacto = require("../controllers/contacto");
const catalogo = require("../controllers/catalogo");
const caballeros = require("../controllers/caballeros");
const categorias = require("../controllers/categorias");
const productos = require("../controllers/productos");
const api = require("../controllers/api");

const index = require("../controllers/index")

const multer = require("../helpers/multer");

const { isAuthenticated, notAuthenticated } = require('../helpers/auth');


module.exports = (app) => {

    app.get('/', index.inicio);

    app.get('/administrar', index.administrar);

    app.get('/administrar/usuarios', usuarios.all);
    app.delete('/administrar/usuarios', usuarios.eliminar);
    app.get('/administrar/usuarios/:id', usuarios.ver);
    app.post('/administrar/usuarios/:id', usuarios.actualizar);

    app.get('/administrar/categorias', categorias.index);
    app.post('/administrar/categorias', categorias.add);
    app.delete('/administrar/categorias', categorias.eliminar);
    
    app.get('/administrar/productos', productos.index);
    app.delete('/administrar/productos', productos.eliminar);
    app.get('/administrar/productos/add', productos.add);
    app.post('/administrar/productos/add', productos.save)

    app.get('/administrar/productos/:id', productos.edit)
    app.post('/administrar/productos/:id', productos.update)

    app.delete('/api/delete/productos/foto',api.eliminar_foto)
    app.post('/api/uploads/productos/', multer.array("fotos",3), api.upload_foto)


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
    app.get('/producto/:id',productos.ver);


    app.get('/perfil',isAuthenticated,usuarios.perfil);
    app.post('/perfil',isAuthenticated,usuarios.actualizar);
    app.get('/carrito',isAuthenticated,usuarios.carrito);

}