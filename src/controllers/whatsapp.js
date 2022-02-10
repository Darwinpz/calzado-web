const ctrl = {};



ctrl.index = async (req,res)=>{


    res.render('administrador/whatsapp.hbs',  {user: req.session})

};



module.exports = ctrl;