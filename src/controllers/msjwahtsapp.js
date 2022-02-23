const accountSid = 'AC0c629bdc8869ef8e831cbbaa89c899b5'; 
const authToken = '0e2d86f62c074ca719151f3549eba7e1'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Prueba enviado a ws', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+593968766671' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();