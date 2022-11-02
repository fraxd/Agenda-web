import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors'
import { configSession } from "./interfaces/config-session.interface";
import { gestionAgenda } from "./gestionAgenda";

const serviceAccount = require("./serviceAccountKey.json");

const gestion = new gestionAgenda();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.json("Hello from Firebase!");
});

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
  res.json({
    status: 'ok',
    mensaje: 'Parece que se cargo jeje'
  });
  });

exports.api = functions.https.onRequest(app);