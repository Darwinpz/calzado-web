'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = process.env.SECRET

exports.createTokenRecuperar = function(user){
    var payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        correo: user.correo,
        tipo: user.tipo,
        iat: moment().unix(),
        exp: moment().add(15,'minutes').unix()
    }
    return jwt.encode(payload,secret);


}