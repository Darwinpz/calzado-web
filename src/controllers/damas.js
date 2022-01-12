const ctrl = {};

ctrl.index = async (req,res)=>{

    res.render('damas.hbs',  {user: req.session})

};

module.exports = ctrl;