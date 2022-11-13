import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors'
import { configSession } from "./interfaces/config-session.interface";
import { gestionAgenda } from "./gestionAgenda";
import { notifyEmail } from "./notifyEmail";

const serviceAccount = require("./serviceAccountKey.json");
const notify = new notifyEmail();
const gestion = new gestionAgenda();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const abrirAgenda = functions.https.onRequest( async(request,response) =>{
    
  const configRef = db.collection('sessions-Config');
  const docsSnap = await configRef.get();
  
  response.json(docsSnap.docs[0].data());
})

// express 
const app = express();
app.use( cors({origin: true}));

app.post('/abrirAgenda', async(req,res) =>{
  const uid:string = req.query.uid as string
  const profesional: string = req.query.profesional as string;
  const especialidad: string = req.query.especialidad as string; 
  let temp = req.body;
  let fechaInicio = new Date(temp.fecha[0]);
  let fechaFin = new Date(temp.fecha[1]);
  const docRef = await db.doc(`sessions-Config/${uid}`).get();
  let config: configSession = docRef.data() as configSession;
  gestion.abrirAgenda(db,config,fechaInicio, fechaFin,profesional, especialidad, uid);
  notify.aperturaAgendaNotify(db, uid, fechaInicio, fechaFin);
  res.json({
    status: 'ok',
    mensaje: 'Parece que se cargo jeje'
  });
  });

  app.get('/especialidades', async (req,res) =>{
    const docsSnap = await db.collection('sessions').get();
    const especialidades = docsSnap.docs.map( doc => doc.data() );
    res.json(especialidades);
  });

  app.get('/profesionalxespecialidades', async (req,res) =>{
    const especialidad: string = req.query.especialidad as string;
    console.log(especialidad);
    let doc: string[] = [];
    let user: any[] = [];
    const docsSnap:admin.firestore.DocumentData[] = await db.doc(`sessions/${especialidad}`).listCollections();
    docsSnap.forEach(function (docData){
        doc.push(docData._queryOptions.collectionId);
      })
    doc.forEach( async function (id){
      let userSnap = await db.doc(`users/${id}`).get();
      user.push(userSnap.data());
    });
    setTimeout(() => {
      console.log(user)
      res.json(user)
    }, 500);
    
  });

  app.get('/getListUser', async (req,res)=>{
    let userRef = await db.collection(`users`).get();
    const usuarios = userRef.docs.map( doc => doc.data() );
    res.json(usuarios);
  });

  app.get('/getlistprofesionales', async (req,res)=>{
    let userRef = await db.collection(`users`).get();
    const usuarios = userRef.docs.map( doc => doc.data() );
    let profesionales: any[] = [];
    usuarios.forEach( (usuario) =>{
      if(usuario.rol === 'profesional'){  
        profesionales.push(usuario);  
      }
    });


    res.json(profesionales);
  });

  app.get('/isOpenSchedule',async (req,res)=>{
    const uid:string = req.query.uid as string;
    const docRef = await db.doc(`sessions-Config/${uid}`).get();
    if(docRef.exists)res.send(true)
    else res.send(false);
  });

  // RETORNA LA AGENDA COMPLETA DEL PROFESIONAL
  // REQUIERE uid y especialidad
  // FALTA MEJORAR PARA QUE ENTREGUE LA AGENDA DE UNA FECHA EN ESPECIFICO
  app.get('/getAgenda', async (req,res)=>{
    const uid:string = req.query.uid as string;
    const especialidad:string = req.query.especialidad as string;
    const docRef = await db.collection(`sessions/${especialidad}/${uid}`).get();
    const sesiones = docRef.docs.map( doc => doc.data() );
    res.json(sesiones);
  });

  // Funcion retorna un array con la disponibilidad del profesional VERSION 1.0
  /** MEJORAR -> FILTRAR POR FECHA Y ENTREGAR SOLO LAS FECHAS DISPONIBLES DESDE HOY EN ADELANTE */
  app.get('/getAgendaProfesional', async (req,res)=>{
    const uid:string = req.query.uid as string;
    const especialidad:string = req.query.especialidad as string;
    const docRef = await db.collection(`sessions/${especialidad}/${uid}`).get();
    const sesiones = docRef.docs.map( doc => doc.data() );
    let sesionesDisponibles: any[] = [];
    sesiones.forEach(function (sesion){
      if(sesion.start && sesion.disponible===true){
        let newString = sesion.start.split('T');
        let horanueva = new Date(newString[0]);
        if(horanueva >= new Date()){
          sesionesDisponibles.push(sesion);
        }
      }
    });
    res.json(sesionesDisponibles);

  })


exports.api = functions.https.onRequest(app);

