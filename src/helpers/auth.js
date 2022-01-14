const ctrl = {};

ctrl.isAuthenticated = (req,res,next)=>{
    
    if(req.session._id != null){

        return next();
    }
    
    res.redirect('/login');

};

ctrl.notAuthenticated = (req,res,next)=>{

    if(req.session._id != null){

        res.redirect('/');

    }else{

        return next();

    }

};

module.exports = ctrl;