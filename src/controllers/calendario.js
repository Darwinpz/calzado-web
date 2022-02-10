const ctrl = {};



ctrl.index = async (req,res)=>{


    res.render('administrador/calendario.hbs',  {user: req.session})

};



module.exports = ctrl;