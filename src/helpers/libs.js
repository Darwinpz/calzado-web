const helpers = {};


helpers.select = (selected, option)=>{

    return (selected == option) ? 'selected="selected"' : ''

}

helpers.tipo_usuario = (tipo)=>{

    if(tipo == "ADMINISTRADOR"){
        return true;
    }

}

module.exports = helpers;