const ctrl = {};

ctrl.isAuthenticated = (req,res,next)=>{
    
    if(req.session.username != null){

        return next();
    }
    
    res.redirect('/');

};

ctrl.notAuthenticated = (req,res,next)=>{

    if(req.session.username != null){

        res.redirect('/');
    }
    
    return next();

};

module.exports = ctrl;