const helpers = {};


helpers.select = (selected, option)=>{

    return (selected == option) ? 'selected="selected"' : ''

}

helpers.tipo_usuario = (tipo)=>{

    if(tipo == "ADMINISTRADOR"){
        return true;
    }

}

helpers.comparar = (estado, tipo)=>{

    if(estado == tipo){
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

helpers.max_min = (items)=>{

    if(items.length>1){

        var max =  Math.max(...items.map(i => i.precio));
        var min = Math.min(...items.map(i => i.precio));

        return "$ "+min+" - $ "+max
        
    }else{

        return "$ "+items[0].precio
    }
    
}

helpers.format = (fecha)=>{

    var hoy = new Date(fecha)

    return ('0' + (hoy.getDate())).slice(-2) + "/"+('0' + (hoy.getMonth() + 1)).slice(-2) +"/"+ hoy.getFullYear()

}



module.exports = helpers;