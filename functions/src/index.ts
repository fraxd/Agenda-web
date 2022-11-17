import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors'
import { configSession } from "./interfaces/config-session.interface";
import { gestionAgenda } from "./gestionAgenda";
import { notifyEmail } from "./notifyEmail";
import * as dotenv from 'dotenv'
import * as mercadopago from 'mercadopago'
import { sesiones } from "./sesiones";
import { pacienteGestion } from "./pacienteGestion";

const serviceAccount = require("./serviceAccountKey.json");
const notify = new notifyEmail();
const gestion = new gestionAgenda();
const sesion = new sesiones();
const paciente = new pacienteGestion
const jwt = require("jsonwebtoken");
const requestPromise = require("request-promise");

dotenv.config();

//** ZOOM API */
const payload = {
  iss: process.env.KEY_API_ZOOM, //ZOOM API KEY
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, process.env.API_SECRET_ZOOM); // ZOOM API SECRET

mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN!);         // Token Acceso MercadoPago


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// express 
const app = express();
app.use(cors({ origin: true }));

app.post('/meeting', (req, res) => {

  

  const uidReserva = req.body.uidReserva as string;
  const idEvento = req.body.idEvento as string;
  const especialidad = req.body.especialidad as string;
  const uidProfesional = req.body.uidProfesional as string;

    let email = "fraxd98@gmail.com"; // your zoom developer email account
    var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
        topic: "Consulta TeleMed", // titulo de la reunion
        type: 1,
        settings: {
        host_video: "true",
        participant_video: "true",
        },
    },
    auth: {
        bearer: token,
    },
    headers: {
        "User-Agent": "Zoom-api-Jwt-Request",
        "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
    };

    requestPromise(options)
    .then(function (response: any) {
        gestion.updateLinkMeeting(db,uidReserva,idEvento,response.start_url,response.join_url,especialidad,uidProfesional);
        notify.emailLinkZoom(db,uidReserva,response.join_url);
        res.json(response);
      })
    .catch(function (err: any) {
        // API call failed...
        console.log("API call failed, reason ", err);
        return err
    });
});
  
//Retorna un array con las sesiones del paciente con estado programadas o Realizadas
app.get('/getSesiones', (req, res) => {
  const uid = req.query.uid as string;
  paciente.getSesionesXpaciente(db,uid).then((sesiones:any) => {
    res.json(sesiones);
  });
})

// Genera el link de pago y registra en la bd la intencion de pago. 
app.post('/payment', (req, res) => {
  const monto: number = parseInt(req.body.monto)
  let domain: string
  if (req.body.domain === 'localhost') {
    domain = 'http://localhost:4200/hubsalud/'
  } else domain = 'https://proyecto-agenda-web-a1177.firebaseapp.com/hubsalud/'
  let approved;
  let preference = {
    items: [
      {
        title: `Consulta Telematica con ${req.body.especialidad}`,
        unit_price: monto,
        quantity: 1,
      },
    ],
    back_urls: {
      "success": `${domain}agendado`,
      "failure": `${domain}failPayment`,
    },
    "auto_return": approved,
    "binary_mode": true,
    "external_reference": req.body.uid,
    "statement_descriptor": 'TeleMed'
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json(response.body.init_point)
    })
    .catch(function (error) {
      console.log(error)
      res.json(error)
    })
})

// Funcion que abre la agenda del profesional especifico
//Se le envia el UID del profesional, especialidad, rango de fechas.
app.post('/abrirAgenda', async (req, res) => {
  const uid: string = req.query.uid as string
  const profesional: string = req.query.profesional as string;
  const especialidad: string = req.query.especialidad as string;
  let temp = req.body;
  let fechaInicio = new Date(temp.fecha[0]);
  let fechaFin = new Date(temp.fecha[1]);
  const docRef = await db.doc(`sessions-Config/${uid}`).get();
  let config: configSession = docRef.data() as configSession;
  gestion.abrirAgenda(db, config, fechaInicio, fechaFin, profesional, especialidad, uid);
  notify.aperturaAgendaNotify(db, uid, fechaInicio, fechaFin);
  res.json({
    status: 'ok',
    mensaje: 'Parece que se cargo jeje'
  });
});

//Retorna un array con todas las especialidades
app.get('/especialidades', async (req, res) => {
  const docsSnap = await db.collection('sessions').get();
  const especialidades = docsSnap.docs.map(doc => doc.data());
  res.json(especialidades);
});

// Retorna un array con el listado de profesional de respectiva especialidad
app.get('/profesionalxespecialidades', async (req, res) => {
  const especialidad: string = req.query.especialidad as string;
  let doc: string[] = [];
  let user: any[] = [];
  const docsSnap: admin.firestore.DocumentData[] = await db.doc(`sessions/${especialidad}`).listCollections();
  docsSnap.forEach(function (docData) {
    doc.push(docData._queryOptions.collectionId);
  })
  doc.forEach(async function (id) {
    let userSnap = await db.doc(`users/${id}`).get();
    let docRef = await db.doc(`sessions-Config/${id}`).get();
    let config: configSession = docRef.data() as configSession;
    let userDoc = userSnap.data();
    userDoc!.valor = config.valor
    user.push(userDoc);
  });

  setTimeout(() => {
    res.json(user)
  }, 700);

});

// Retorna un Array con el listado de usuarios en general
app.get('/getListUser', async (req, res) => {
  let userRef = await db.collection(`users`).get();
  const usuarios = userRef.docs.map(doc => doc.data());
  res.json(usuarios);
});

// Retorna un array con listado de Profesionales
// -- impelemntar opcion de desactivar cuentas
app.get('/getlistprofesionales', async (req, res) => {
  let userRef = await db.collection(`users`).get();
  const usuarios = userRef.docs.map(doc => doc.data());
  let profesionales: any[] = [];
  usuarios.forEach((usuario) => {
    if (usuario.rol === 'profesional') {
      profesionales.push(usuario);
    }
  });
  res.json(profesionales);
});


// retorna un booleano confirmando si tiene o no la cuenta abierta o cerrada 
app.get('/isOpenSchedule', async (req, res) => {
  const uid: string = req.query.uid as string;
  const docRef = await db.doc(`sessions-Config/${uid}`).get();
  if (docRef.exists) res.send(true)
  else res.send(false);
});

// RETORNA LA AGENDA COMPLETA DEL PROFESIONAL
// REQUIERE uid y especialidad
// FALTA MEJORAR PARA QUE ENTREGUE LA AGENDA DE UNA FECHA EN ESPECIFICO
app.get('/getAgenda', async (req, res) => {
  const uid: string = req.query.uid as string;
  const especialidad: string = req.query.especialidad as string;
  const docRef = await db.collection(`sessions/${especialidad}/${uid}`).get();
  const sesiones = docRef.docs.map(doc => doc.data());
  res.json(sesiones);
});

// Funcion retorna un array con la disponibilidad del profesional VERSION 1.0
/** MEJORAR -> FILTRAR POR FECHA Y ENTREGAR SOLO LAS FECHAS DISPONIBLES DESDE HOY EN ADELANTE */
app.get('/getAgendaProfesional', async (req, res) => {
  const uid: string = req.query.uid as string;
  const especialidad: string = req.query.especialidad as string;
  const docRef = await db.collection(`sessions/${especialidad}/${uid}`).get();
  const sesiones = docRef.docs.map(doc => doc.data());
  let sesionesDisponibles: any[] = [];
  sesiones.forEach(function (sesion) {
    if (sesion.start && sesion.disponible === true) {
      let newString = sesion.start.split('T');
      let horanueva = new Date(newString[0]);
      if (horanueva >= new Date()) {
        sesionesDisponibles.push(sesion);
      }
    }
  });
  res.json(sesionesDisponibles);
});

// Funcion que retorna un array con la Config SESION del profesional
app.get('/getConfigAgenda', async (req, res) => {
  const uid: string = req.query.uid as string;
  const docRef = await db.doc(`sessions-Config/${uid}`).get();
  const config: configSession = docRef.data() as configSession;
  res.json(config);
})

//Regista en la DB la peticion de reserva.
app.post('/newSesion', async (req, res) => {
  const uidUnico: string = req.body.uid as string;
  const especialidad: string = req.body.especialidad as string;
  const monto: number = req.body.monto as number;
  const uidEvento: string = req.body.uidEvento as string;
  const uidProfesional: string = req.body.uidProfesional as string;
  const nombreProfesional: string = req.body.nombreProfesional as string;
  const timeStart: string = req.body.timeStart as string;
  const timeEnd: string = req.body.timeEnd as string;
  const uidPaciente: string = req.body.uidPaciente as string;
  res.json(sesion.newSesion(db, uidUnico, especialidad, monto, uidEvento, uidProfesional, nombreProfesional, timeStart, timeEnd, uidPaciente));

})


//Se anula la reserva de la sesion -- osea no se realiza DADO A QUE EL PACIENTE NO PAGA
app.post('/anularReserva', async (req, res) => {
  res.json(sesion.anularReserva(db, req.body.uid));
});


// Se confirma la reserva de la sesion -- osea se realiza
// uid es el id de la RESERVA 
// IDEVENTO es el id del evento en el calendario
app.post('/confirmarReserva', async (req, res) => {
  notify.sendEmailNewReserva(db,req.body.uidProfesional,req.body.uidPaciente, req.body.idEvento,req.body.especialidad) // enviar correo al usuario.
  res.json(sesion.confirmarReserva(db, 
                            req.body.uid, 
                            req.body.payment_id,
                            req.body.uidProfesional,
                            req.body.uidPaciente,
                            req.body.especialidad,
                            req.body.idEvento))
})

// Anulacion de cita por parte del paciente
app.post('/anularSesion', async (req,res) =>{
  paciente.anularCita(db, req.body.idReserva, req.body.idProfesional, req.body.especialidad, req.body.uidEvento);

  res.json('ok');

})

// Reagendar hora 
app.post('/reagendar',async (req,res)=>{
  notify.sendEmailNewReserva(db,req.body.uidProfesional,req.body.uidPaciente, req.body.nuevoEventoId,req.body.especialidad) // enviar correo al usuario.
  paciente.reagendarcita(db, req.body.uidReserva, req.body.uidEvento, req.body.uidProfesional, req.body.especialidad, 
                              req.body.uidPaciente, req.body.nuevoStart, req.body.nuevoEnd,req.body.nuevoEventoId).then( ()=>{
                                res.json('ok')
                              })
})

exports.api = functions.https.onRequest(app);

