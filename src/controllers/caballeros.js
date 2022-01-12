const ctrl = {};

ctrl.index = async (req,res)=>{

    res.render('caballeros.hbs',  {user: req.session})

};

module.exports = ctrl;