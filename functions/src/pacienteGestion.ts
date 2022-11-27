/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
import * as admin from "firebase-admin";


export class pacienteGestion {
  // Retorna un array con las sesiones de un paciente
  async getSesionesXpaciente(db: admin.firestore.Firestore, uid: string) {
    const sesiones = await db.collection("sesionesReserva")
        .where("uidPaciente", "==", uid).get();

    const sesionesArray = sesiones.docs.map((doc) => doc.data());
    const sesionesFiltradas: any[] = [];
    const fechaHoy = new Date();
    sesionesArray.forEach(function(sesion) {
      const fechaSesion = new Date(sesion.timeStart);
      if (sesion.status !== "cancelada" && fechaSesion >= fechaHoy) sesionesFiltradas.push(sesion);
    });
    return sesionesFiltradas;
  }

  async getSesionesXpacientePast(db: admin.firestore.Firestore, uid: string) {
    const sesiones = await db.collection("sesionesReserva")
        .where("uidPaciente", "==", uid).get();

    const sesionesArray = sesiones.docs.map((doc) => doc.data());
    const sesionesFiltradas: any[] = [];
    const fechaHoy = new Date();
    sesionesArray.forEach(function(sesion) {
      const fechaSesion = new Date(sesion.timeStart);
      if (sesion.status !== "cancelada" && fechaSesion < fechaHoy) {
        sesion.status = "Finalizada";
        sesionesFiltradas.push(sesion);
      }
      if ( sesion.status == "cancelada") sesionesFiltradas.push(sesion);
    });
    return sesionesFiltradas;
  }
  // Anular cita
  anularCita(db: admin.firestore.Firestore, idReserva: string,
      idProfesional: string, especialidad: string, uidEvento: string) {
    const reservaRef = db.doc(`/sesionesReserva/${idReserva}`);
    const dataReserva = {
      pago: "En proceso Reembolso",
      status: "cancelada",
    };
    reservaRef.update(dataReserva).then(() => {
      console.log("Registrado Correctamente");
    });

    // eslint-disable-next-line max-len
    const eventoRef = db.doc(`/sessions/${especialidad}/${idProfesional}/${uidEvento}`);
    const datEvent = {
      color: "green",
      disponible: true,
      fechaTomada: "",
      idReserva: "",
    };
    eventoRef.update(datEvent).then(() => {
      console.log("Actualizado Sessions");
    });
  }

  // reagendar cita
  async reagendarcita(db: admin.firestore.Firestore, uidReserva: string, uidEvento: string, uidProfesional: string, especialidad: string,
      uidPaciente: string, nuevoStart: string, nuevoEnd: string, nuevoEventoId: string) {
    const reservaRef = db.doc(`/sesionesReserva/${uidReserva}`);
    const dataReserva = {
      uidEvento: nuevoEventoId,
      timeStart: nuevoStart,
      timeEnd: nuevoEnd,
    };
    reservaRef.update(dataReserva).then(() => {
      console.log("Actualizado Correctamente");
    });

    const eventoRefOld = db.doc(`/sessions/${especialidad}/${uidProfesional}/${uidEvento}`);
    const eventoOldTemp = await eventoRefOld.get();
    const urlProfesional = eventoOldTemp.data()?.urlProfesional;
    const dataEventoOld = {
      color: "green",
      disponible: true,
      fechaTomada: "",
      idReserva: "",
      pacienteUid: "",
      urlProfesional: "",
    };
    eventoRefOld.update(dataEventoOld).then(() => {
      console.log("Data eliminada del evento antiguo");
    });
    const eventoRefNew = db.doc(`/sessions/${especialidad}/${uidProfesional}/${nuevoEventoId}`);
    const dataEventoNew = {
      color: "yellow",
      disponible: false,
      fechaTomada: new Date(),
      idReserva: uidReserva,
      pacienteUid: uidPaciente,
      urlProfesional: urlProfesional,
    };
    eventoRefNew.update(dataEventoNew).then(() => {
      console.log("Data ingresada en la nueva sesion");
    });
  }
}
