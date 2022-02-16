'use strict'
var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'calzadoivanlafebre@gmail.com', // generated ethereal user
      pass: 'cxvlzkprrayzssxw', // generated ethereal password
    },
});
 
transporter.verify().then(()=> {
    console.log('Nodemailer esta corriendo');
})

module.exports = transporter; 