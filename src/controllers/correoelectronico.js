const ctrl = {};



ctrl.index = async (req,res)=>{


    res.render('administrador/correoelectronico.hbs',  {user: req.session})

};

ctrl.enviar = async (req,res)=>{


    console.log('Entra aquí')

};



module.exports = ctrl;