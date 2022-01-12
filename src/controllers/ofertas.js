const ctrl = {};

ctrl.index = async (req,res)=>{

    res.render('ofertas.hbs', {user: req.session})

};

module.exports = ctrl;