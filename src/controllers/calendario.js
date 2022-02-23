const ctrl = {};


const Pedido = require("../models/pedidos");
const Calendario = require("../models/calendario");

ctrl.index = async (req, res) => {

  var pedido_count = pedido_count = await Pedido.count({ $nor: [{ "estado": "APROBADO" }] })

  res.render('administrador/calendario.hbs', { user: req.session, pedido_count })

};


ctrl.add = async (req, res) => {

  const { title, start, end, estado, url } = req.body

  var backgroundColor = "blue"

  if (estado == "PROCESO") {
    backgroundColor = "orange"
  }

  if (estado == "INCOMPLETO") {
    backgroundColor = "red"
  }

  if (estado == "COMPLETO") {
    backgroundColor = "green"
  }

  const calendario = new Calendario({ title, start, end, backgroundColor, url, estado })

  await calendario.save()

  res.redirect("/administrar/calendario")

}


ctrl.update = async (req, res) => {

  const { title, estado, id } = req.body

  const calendario = await Calendario.findOne({ "_id": id });

  if (calendario) {

    calendario.title = title
    calendario.estado = estado

    var backgroundColor = "blue"

    if (estado == "PROCESO") {
      backgroundColor = "orange"
    }

    if (estado == "INCOMPLETO") {
      backgroundColor = "red"
    }

    if (estado == "COMPLETO") {
      backgroundColor = "green"
    }

    calendario.backgroundColor = backgroundColor

    await calendario.save()

    res.json(true);

  } else {

    res.json(false);

  }

}

ctrl.eliminar = async (req, res) => {

  const calendario = await Calendario.findOne({ "_id": req.body.id });

  if (calendario) {

    await calendario.remove();

    res.json(true);

  } else {

    res.json(false);

  }

}


ctrl.ver = async (req, res) => {

  /* var arreglo = [
       {
         title: 'All Day Event',
         start: '2022-03-01',
         backgroundColor: 'red'
       },
       {
         title: 'Long Event',
         start: '2022-03-07',
         end: '2022-03-10',
         backgroundColor: 'green'
       },
       {
         id: 999,
         title: 'Repeating Event',
         start: '2022-03-09T16:00:00'
       },
       {
         id: 999,
         title: 'Repeating Event',
         start: '2022-03-16T16:00:00'
       },
       {
         title: 'Conference',
         start: '2022-03-11',
         end: '2022-03-13'
       },
       {
         title: 'Meeting',
         start: '2022-03-12T10:30:00',
         end: '2022-03-12T12:30:00'
       },
       {
         title: 'Lunch',
         start: '2022-03-12T12:00:00'
       },
       {
         title: 'Meeting',
         start: '2022-03-12T14:30:00'
       },
       {
         title: 'Happy Hour',
         start: '2022-03-12T17:30:00'
       },
       {
         title: 'Dinner',
         start: '2022-03-12T20:00:00'
       },
       {
         title: 'Birthday Party',
         start: '2022-03-13T07:00:00'
       },
       {
         title: 'Click for Google',
         url: 'http://google.com/',
         start: '2022-03-28'
       }
     ]
*/

  var arreglo = await Calendario.find();
  res.json(arreglo)
}



module.exports = ctrl;