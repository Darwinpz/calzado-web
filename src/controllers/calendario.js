const ctrl = {};


const Pedido = require("../models/pedidos");

ctrl.index = async (req,res)=>{

    var pedido_count = pedido_count = await Pedido.count({$nor:[{"estado":"APROBADO"}]})

    res.render('administrador/calendario.hbs',  {user: req.session, pedido_count})

};



module.exports = ctrl;