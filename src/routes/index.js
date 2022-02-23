const usuarios = require("../controllers/usuarios");
const ofertas = require("../controllers/ofertas");
const damas = require("../controllers/damas");
const contacto = require("../controllers/contacto");
const catalogo = require("../controllers/catalogo");
const caballeros = require("../controllers/caballeros");
const categorias = require("../controllers/categorias");
const productos = require("../controllers/productos");
const carrito = require("../controllers/carrito");
const calendario = require("../controllers/calendario");
const reporte = require("../controllers/reportes");
const pedidos = require("../controllers/pedidos");
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

    app.get('/administrar/contactcentercorreo',isAuthenticated,contacto.contactcentercorreo);
    app.post('/administrar/contactcentercorreo',isAuthenticated,contacto.enviarcorreo);
    app.get('/administrar/calendario', isAuthenticated, calendario.index);
    app.post('/administrar/calendario', isAuthenticated, calendario.add);
    app.delete('/administrar/calendario', isAuthenticated, calendario.eliminar);
    app.get('/administrar/calendario/ver', isAuthenticated, calendario.ver);
    app.post('/administrar/calendario/update', isAuthenticated, calendario.update);

    app.get('/administrar/contactcenterwhatsapp',isAuthenticated,contacto.contactcenterwhatsapp);
    //app.post('/administrar/contactcenterwhatsapp',isAuthenticated,contacto.enviarwhatsapp);

    app.get('/administrar/reportes', isAuthenticated, reporte.index);
    app.get('/administrar/reportes/clientes',isAuthenticated, reporte.clientes);
    app.get('/administrar/reportes/productos',isAuthenticated, reporte.productos);

    app.delete('/api/delete/productos/foto',api.eliminar_foto)
    app.post('/api/uploads/productos/', multer.array("fotos",3), api.upload_foto)
    app.post('/api/uploads/comprobante/', multer.array("foto",1), pedidos.upload_transacciones)
    app.post('/api/buscar/productos/colores',api.buscar_tallas)

    app.get('/login',notAuthenticated ,usuarios.login);
    app.post('/login',notAuthenticated,usuarios.ingresar);

    app.get('/recuperarcuenta',notAuthenticated ,usuarios.recuperarcuenta);
    app.post('/recuperarcuenta',notAuthenticated ,usuarios.enviarcorreo);

    app.get('/cambiarpassword/:token',notAuthenticated ,usuarios.cambiarpassword);
    app.post('/cambiarpassword/:token',notAuthenticated ,usuarios.cambiarpasswordBD);

    app.get('/registro',notAuthenticated,usuarios.registro);
    app.post('/registro',notAuthenticated, usuarios.guardar);

    app.get('/logout',isAuthenticated, usuarios.logout);
    app.post('/contacto',notAuthenticated ,usuarios.sugerencia);
    
    app.get('/catalogo', catalogo.index );

    app.get('/ofertas', ofertas.index);
    app.get('/ofertas/filtros/:campos',ofertas.filtro);

    app.get('/caballeros', caballeros.index);
    app.get('/caballeros/filtros/:campos',caballeros.filtro);

    app.get('/damas', damas.index);
    app.get('/damas/filtros/:campos',damas.filtro);

    app.get('/contacto', contacto.index);
    app.post('/producto/like',productos.like);
    app.post('/producto/unlike',productos.unlike);
    app.get('/producto/:id',productos.ver);

    app.get('/perfil',isAuthenticated,usuarios.perfil);
    app.post('/perfil',isAuthenticated,usuarios.actualizar);

    app.get('/carrito',isAuthenticated,carrito.index);
    app.post('/carrito/add', isAuthenticated,carrito.add);
    app.delete('/carrito',isAuthenticated,carrito.eliminar);

    app.post('/carrito/pedir', isAuthenticated, carrito.pedir);

    app.get('/pedidos', isAuthenticated, pedidos.index);
    app.get('/pedidos/:tipo', isAuthenticated, pedidos.filtro);
    app.delete('/pedidos/eliminar', isAuthenticated, pedidos.eliminar);

    app.post('/partials/correoelectronico', isAuthenticated, contacto.enviarcorreo);

}