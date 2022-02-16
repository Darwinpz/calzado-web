'use strict'
var nodemailer = require("nodemailer"); 


const transporter1 = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'contactocalzadoivanlafebre@gmail.com', // generated ethereal user
    pass: 'zzzdfuirizesrrrf', // generated ethereal password
  },
});

transporter1.verify().then(()=> {
  console.log('Nodemailer - contacto esta corriendo');
})
 
 
module.exports = transporter1;