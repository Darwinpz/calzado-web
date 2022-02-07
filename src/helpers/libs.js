const helpers = {};


helpers.select = (selected, option)=>{

    return (selected == option) ? 'selected="selected"' : ''

}

helpers.tipo_usuario = (tipo)=>{

    if(tipo == "ADMINISTRADOR"){
        return true;
    }

}

helpers.equalscero = (numero)=>{

    if(numero == 0){
        return true;
    }

}

helpers.imagen = (url)=>{

    return url[0]

}

helpers.for = (from, to, incr, block) =>{
    
    var acum = '';

    for(var i = from; i <= to-1; i += incr)
        acum += block.fn(i);
    return acum;

}

helpers.index = (obj, pos, item)=>{

    return obj[pos][item]

}

module.exports = helpers;