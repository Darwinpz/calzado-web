const usuarios = require("../controllers/usuarios");
const ofertas = require("../controllers/ofertas");
const damas = require("../controllers/damas");
const contacto = require("../controllers/contacto");
const catalogo = require("../controllers/catalogo");
const caballeros = require("../controllers/caballeros");
const categorias = require("../controllers/categorias");
const productos = require("../controllers/productos");
const carrito = require("../controllers/carrito")
const api = require("../controllers/api");

const index = require("../controllers/index")

const multer = require("../helpers/multer");

const { isAuthenticated, notAuthenticated } = require('../helpers/auth');


module.exports = (app) => {

    app.get('/', index.inicio);

    app.get('/administrar',isAuthenticated, index.administrar);

    app.get('/administrar/usuarios',isAuthenticated, usuarios.all);
    app.delete('/administrar/usuarios',isAuthenticated, usuarios.eliminar);
    app.get('/administrar/usuarios/:id',isAuthenticated, usuarios.ver);
    app.post('/administrar/usuarios/:id',isAuthenticated, usuarios.actualizar);

    app.get('/administrar/categorias',isAuthenticated, categorias.index);
    app.post('/administrar/categorias',isAuthenticated, categorias.add);
    app.delete('/administrar/categorias',isAuthenticated, categorias.eliminar);
    
    app.get('/administrar/productos',isAuthenticated, productos.index);
    app.delete('/administrar/productos',isAuthenticated, productos.eliminar);
    app.get('/administrar/productos/add',isAuthenticated, productos.add);
    app.post('/administrar/productos/add',isAuthenticated, productos.save)

    app.get('/administrar/productos/:id',isAuthenticated, productos.edit)
    app.post('/administrar/productos/:id',isAuthenticated, productos.update)

    app.delete('/api/delete/productos/foto',api.eliminar_foto)
    app.post('/api/uploads/productos/', multer.array("fotos",3), api.upload_foto)
    app.post('/api/buscar/productos/colores',api.buscar_tallas)

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
    app.get('/carrito',isAuthenticated,carrito.index);
    app.post('/carrito/add', isAuthenticated,carrito.add)

}