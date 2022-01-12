const ctrl = {};

ctrl.index = async (req,res)=>{

    res.render('catalogo.hbs',  {user: req.session})

};

module.exports = ctrl;