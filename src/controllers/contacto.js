const ctrl = {};

ctrl.index = async (req,res)=>{

    res.render('contacto.hbs',  {user: req.session})

};

module.exports = ctrl;