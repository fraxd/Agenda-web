/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import * as admin from "firebase-admin";


export class profesionalStats {
  // retorna un array con los pacientes agendados para hoy, semana y la ultima fecha apertura agenda
  async pacientesAgendadosCount(db:admin.firestore.Firestore,
      uidProfesional:string, especialidad:string) {
    let reservasToday = 0;
    let reservasWeek = 0;
    const today = new Date();
    const collectionRef = db.collection(`sessions/${especialidad}/${uidProfesional}`).where("disponible", "==", false);
    const reservas = await collectionRef.get();
    const reservasArray = reservas.docs.map((doc) => doc.data());
    reservasArray.forEach((reserva) => {
      const fechaReserva = new Date(reserva.start);
      if (fechaReserva.toLocaleDateString() == today.toLocaleDateString()) {
        reservasToday++;
        reservasWeek++;
      }
      if (fechaReserva.getDate()<=today.getDate()+7) reservasWeek++;
    });
    console.log(reservasToday);
    console.log(reservasWeek);
    const docRef = await db.doc(`sessions/${especialidad}/${uidProfesional}/details`).get();
    const doc = docRef.data();
    const fecha = doc?.fecha.toDate();

    return {reservasToday, reservasWeek, fecha};
  }


  async getSesionesProfesional(db:admin.firestore.Firestore, uidProfesional:string) {
    const collectionRef = await db.doc(`users/${uidProfesional}`).get();
    const doc = collectionRef.data();
    const especialidad = doc?.especialidad;
    const date = new Date();
    const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7);

    const sesionesRef = db.collection(`sessions/${especialidad}/${uidProfesional}`).where("disponible", "==", false);
    const sesionDoc = await sesionesRef.get();
    let sesiones: any[] = [];
    sesionDoc.forEach((doc) => {
      const dateDoc = new Date(doc.data().start);
      if (dateDoc >= date && dateDoc <= endDate) {
        sesiones.push(doc.data());
      } else console.log("No entro", doc.data().start);
    });
    return sesiones;
  }
}
