const ctrl = {};

const accountSid = 'AC0c629bdc8869ef8e831cbbaa89c899b5';
const authToken = '0e2d86f62c074ca719151f3549eba7e1';
const client = require('twilio')(accountSid, authToken);


ctrl.index = async (req, res) => {



    res.render('administrador/whatsapp.hbs', { user: req.session })

};



module.exports = ctrl;