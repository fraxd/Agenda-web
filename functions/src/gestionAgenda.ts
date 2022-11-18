/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import {configSession, horasSesion} from "./interfaces/config-session.interface";
import {session} from "./interfaces/session.interface";
import {v4 as uuidv4} from "uuid";
import * as admin from "firebase-admin";


interface Time {
  hours: number,
  minutes: number
}

interface Details {
  fecha: Date
}


export class gestionAgenda {
  nombreProfesional = "";
  especialidad = "";
  uid = "";
  db!: admin.firestore.Firestore;

  public abrirAgenda(dbtemp: admin.firestore.Firestore, config: configSession, fechaInicio: Date, fechanFin: Date, profesional: string, esp: string, uid: string) {
    this.nombreProfesional = profesional;
    this.especialidad = esp;
    this.uid = uid;
    this.db = dbtemp;

    // Codigo bastante poco eficiente, evaluar mejorarlo
    if (config.lunes.activo) {
      this.generarAgenda(config.lunes, 1, config.duracion, fechaInicio, fechanFin);
    }
    if (config.martes.activo) {
      this.generarAgenda(config.martes, 2, config.duracion, fechaInicio, fechanFin);
    }
    if (config.miercoles.activo) {
      this.generarAgenda(config.miercoles, 3, config.duracion, fechaInicio, fechanFin);
    }
    if (config.jueves.activo) {
      this.generarAgenda(config.jueves, 4, config.duracion, fechaInicio, fechanFin);
    }
    if (config.viernes.activo) {
      this.generarAgenda(config.viernes, 5, config.duracion, fechaInicio, fechanFin);
    }
  }

  generarAgenda(sessionConfig: horasSesion, dia: number, duracion: number, fechaInicio: Date, fechaFin: Date) {
    let sessiones: session[] = [];
    let flag = true;
    let fecha: Date = new Date(fechaInicio); // basicamente creo una copia
    let timeCurrent: Time;
    let timeCurrentEnd: Time;
    const fechaTemp: Date = new Date(sessionConfig.horaFin);
    const difDay = fecha.getDay() - dia; // lunes =1, martes = 2, miercoles = 3
    const dateTemp = new Date(sessionConfig.horaInicio);
    switch (difDay) {
      case 1:
        fecha.setDate(fecha.getDate() + 6);
        break;
      case 2:
        fecha.setDate(fecha.getDate() + 5);
        break;
      case 3:
        fecha.setDate(fecha.getDate() + 4);
        break;
      case 4:
        fecha.setDate(fecha.getDate() + 3);
        break;
      case 5:
        fecha.setDate(fecha.getDate() + 2);
        break;
      case 6:
        fecha.setDate(fecha.getDate() + 1);
        break;
    }
    if (difDay < 0) fecha.setDate(fecha.getDate() - difDay); // ajuste de fecha al dia de la sesion
    // if (difDay > 0) fecha.setDate(fecha.getDate() + (difDay + 5)); // - 3
    console.log("fecha Inicio:", fechaInicio);
    console.log("dia Actual", dia);
    console.log("fecha actual", fecha);
    console.log("dif day", difDay);
    for (let i = 0; i < 5; i++) {
      timeCurrent = {hours: dateTemp.getHours(), minutes: dateTemp.getMinutes()};
      timeCurrentEnd = timeCurrent;
      while (flag) {
        timeCurrentEnd = this.timeAddition(timeCurrentEnd, duracion);

        sessiones.push({ // Tal vez agregarle algo mas
          nombreProfesional: this.nombreProfesional,
          uid: this.uid,
          especialidad: this.especialidad,
          disponible: true,
          id: uuidv4(),
          title: "Consulta",
          start: this.timeGenerator(fecha, timeCurrent),
          end: this.timeGenerator(fecha, timeCurrentEnd),
          color: "green",
        });
        if (timeCurrentEnd.hours > fechaTemp.getHours()) flag = false;
        else if (timeCurrentEnd.hours == fechaTemp.getHours() &&
          timeCurrentEnd.minutes >= fechaTemp.getMinutes()) flag = false;

        timeCurrent = timeCurrentEnd;
      }

      fecha.setDate(fecha.getDate() + 7);
      flag = true;
      if (fecha > fechaFin) {
        i = 10; // Si la nueva fecha supera el tope, pa fuera altoke.
      }
    }

    this.subirBD(sessiones, fechaFin); // se envia dia para saber cuando se envia el contenido
  }

  timeGenerator(fecha: Date, time: Time) { // Genera el string con la fecha y la hora;
    let fechaString: string = fecha.toISOString();
    let fechaTemp: string[] = fechaString.split("T", 1);
    let fechaNueva: string;
    if (time.hours < 10) {
      const cero: string = String(time.hours).padStart(2, "0");
      fechaNueva = fechaTemp[0].concat("T", cero);
    } else {
      fechaNueva = fechaTemp[0].concat("T", time.hours.toString());
    }
    if (time.minutes < 10) {
      const cero: string = String(time.minutes).padStart(2, "0");
      fechaNueva = fechaNueva.concat(":", cero);
    } else {
      fechaNueva = fechaNueva.concat(":", time.minutes.toString());
    }
    fechaNueva = fechaNueva.concat(":", "00");
    return fechaNueva;
  }

  // Retorna el tiempo sumado a la duracion de la sesion
  timeAddition(timeCurrent: Time, duracion: any): Time {
    const duracionNumber: number = parseInt(duracion);
    let newMinutes: number = timeCurrent.minutes + duracionNumber as number;
    let newHours: number = timeCurrent.hours as number;
    if (newMinutes >= 60) {
      newMinutes = newMinutes - 60;
      newHours++;
    }
    const newTime: Time = {
      hours: newHours,
      minutes: newMinutes,
    };
    return newTime as Time;
  }

  // Sube el array de sesiones a la Bd
  subirBD(sessiones: session[], fechaFin: Date) {
    const colRef = this.db.collection(`sessions/${this.especialidad}/${this.uid}`);
    sessiones.forEach(function(sesion) {
      const sessionRef = colRef.doc(sesion.id);
      sessionRef.create(sesion).catch((err) => {
        console.log(err);
      });
    });

    const fechaDB: Details = {
      fecha: fechaFin,
    };
    const docRef = colRef.doc("details");
    docRef.set(fechaDB, {
      merge: true,
    });
  }

  // regista el url de zoom en la respectiva db
  updateLinkMeeting(db: admin.firestore.Firestore, uidReserva: string, uidEvento: string, urlProfesional: string, urlPaciente: string, especialidad: string, uidProfesional: string) {
    this.db = db;
    const colRef = this.db.collection(`sessions/${especialidad}/${uidProfesional}`);
    const docRef = colRef.doc(uidEvento);
    const data = {
      urlProfesional: urlProfesional,
    };
    docRef.set(data, {
      merge: true,
    }).then(() => {
      console.log("Se actualizo el link del profesional");
    }).catch(() => {
      console.log("fallo profesional");
    });
    const docRefPaciente = this.db.doc(`sesionesReserva/${uidReserva}`);
    const dataPaciente = {
      urlPaciente: urlPaciente,
    };
    docRefPaciente.set(dataPaciente, {
      merge: true,
    }).then(() => {
      console.log("Se actualizo el link del paciente");
    }).catch(() => {
      console.log("fallo paciente");
    });
  }

  // Funcion que procede cuando el profesional anula una hora
  async anularHoraXprofesional(db: admin.firestore.Firestore, uidEvento: string, especialidad: string, uidProfesional: string) {
    this.db = db;
    const colRef = this.db.collection(`sessions/${especialidad}/${uidProfesional}`);
    const docRef = colRef.doc(uidEvento);
    const data = {
      disponible: false,
      fechaTomada: "",
      pacienteUid: "",
    };
    docRef.set(data, {
      merge: true,
    }).then(() => {
      console.log("Se actualizo el link del profesional");
    }).catch(() => {
      console.log("fallo profesional");
    });

    const docSesionReservaRef = db.collection("sesionesReserva").where("uidEvento", "==", uidEvento);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const docSesionReserva = await docSesionReservaRef.get() as any;
    const uidReserva = docSesionReserva.uidReserva;
    const docRefPaciente = this.db.doc(`sesionesReserva/${uidReserva}`);
    const dataPaciente = {
      status: "Cancelada por el profesional",
    };
    docRefPaciente.update(dataPaciente);
  }


  async getSesionesXProfesional(db: admin.firestore.Firestore, uid: string) {
    const sesiones = await db.collection("sesionesReserva")
        .where("uidProfesional", "==", uid).get();

    const sesionesArray = sesiones.docs.map((doc) => doc.data());
    const sesionesFiltradas: any[] = [];
    sesionesArray.forEach(function(sesion) {
      if (sesion.status !== "cancelada") sesionesFiltradas.push(sesion);
    });
    return sesionesFiltradas;
  }
}

// / queda pendiente modificar un poco la parte del paciente para que sepa directamente en la pagina que su cita fue anulada.
