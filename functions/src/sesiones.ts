/* eslint-disable require-jsdoc */
import * as admin from "firebase-admin";


export class sesiones {
  newSesion(db: admin.firestore.Firestore, uidUnico: string,
      especialidad: string, monto: number, uidEvento: string,
      uidProfesional: string, nombreProfesional: string, timeStart: string,
      timeEnd: string, uidPaciente: string) {
    console.log("idUnico new", uidUnico);
    return db.collection("sesionesReserva").doc(uidUnico).set({
      especialidad: especialidad,
      monto: monto,
      uidEvento: uidEvento,
      uidProfesional: uidProfesional,
      nombreProfesional: nombreProfesional,
      timeStart: timeStart,
      timeEnd: timeEnd,
      pago: "Pendiente",
      payment_id: "",
      timeStamp: Date.now(),
      uidPaciente: uidPaciente,
      uidReserva: uidUnico,
      status: "programada",
    });
  }
  // simplemente registra que el pago fue fallido
  anularReserva(db: admin.firestore.Firestore, uidUnico: string) {
    return db.collection("sesionesReserva").doc(uidUnico).update({
      pago: "Fallido",
      status: "cancelada",
    });
  }
  // Confirma la reserva y registra en la db
  confirmarReserva(db: admin.firestore.Firestore, uidUnico: string,
      // eslint-disable-next-line camelcase
      payment_id: number, uidProfesional: string, uidPaciente: string,
      especialidad: string, idEvento: string) {
    console.log("Id unico confirmado", uidUnico);
    db.doc(`sessions/${especialidad}/${uidProfesional}/${idEvento}`).set({
      disponible: false,
      fechaTomada: Date.now(),
      pacienteUID: uidPaciente,
      idReserva: uidUnico,
      color: "yellow",
    }, {merge: true}).catch((err) => {
      console.log(err);
    });

    return db.collection("sesionesReserva").doc(uidUnico).set({
      pago: "Exitoso",
      // eslint-disable-next-line camelcase
      payment_id: payment_id,
    }, {merge: true});
  }
}
