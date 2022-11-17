import * as admin from 'firebase-admin';


// Aca lo ideal es ir implementando todas las funciones relacionadas a los pacientes (algo tarde?, si bastante tarde lo implemente)


export class pacienteGestion{


    //Retorna un array con las sesiones de un paciente
    async getSesionesXpaciente(db:admin.firestore.Firestore, uid:string){
        let sesiones = await db.collection("sesionesReserva")
        .where("uidPaciente", "==", uid).get();

        let sesionesArray = sesiones.docs.map(doc => doc.data());
        let sesionesFiltradas:any[] = [];
        sesionesArray.forEach(function (sesion) {
            if(sesion.status!=='cancelada') sesionesFiltradas.push(sesion);
        });
        return sesionesFiltradas
    }

    //Anular cita 
    anularCita(db:admin.firestore.Firestore, idReserva:string, idProfesional:string, especialidad:string, uidEvento:string){
        let reservaRef  = db.doc(`/sesionesReserva/${idReserva}`);
        let dataReserva ={
            pago: 'En proceso Reembolso',
            status: 'cancelada'
        }
        reservaRef.update(dataReserva).then( ()=>{
            console.log('Registrado Correctamente')
        });

        let eventoRef = db.doc(`/sessions/${especialidad}/${idProfesional}/${uidEvento}`);
        let datEvent = {
            color: 'green',
            disponible: true,
            fechaTomada: '',
            idReserva: ''
            }
        eventoRef.update(datEvent).then( ()=>{
            console.log('Actualizado Sessions')
        })

    }

    //reagendar cita
    async reagendarcita(db:admin.firestore.Firestore, uidReserva:string, uidEvento:string, uidProfesional:string, especialidad:string, 
                        uidPaciente:string, nuevoStart:string, nuevoEnd:string, nuevoEventoId:string){
        
        let reservaRef  = db.doc(`/sesionesReserva/${uidReserva}`);
        let dataReserva ={
            uidEvento: nuevoEventoId,
            timeStart: nuevoStart,
            timeEnd: nuevoEnd
        };
        reservaRef.update(dataReserva).then( ()=>{
            console.log('Actualizado Correctamente')
        });

        let eventoRefOld = db.doc(`/sessions/${especialidad}/${uidProfesional}/${uidEvento}`);
        let eventoOldTemp = await eventoRefOld.get();
        let urlProfesional = eventoOldTemp.data()!.urlProfesional;
        let dataEventoOld = {
            color: 'green',
            disponible: true,
            fechaTomada: '',
            idReserva: '',
            pacienteUid: '',
            urlProfesional: ''
        }
        eventoRefOld.update(dataEventoOld).then( ()=>{
            console.log('Data eliminada del evento antiguo');
        })
        let eventoRefNew = db.doc(`/sessions/${especialidad}/${uidProfesional}/${nuevoEventoId}`);
        let dataEventoNew = {
            color: 'yellow',
            disponible: false,
            fechaTomada: new Date(),
            idReserva: uidReserva,
            pacienteUid: uidPaciente,
            urlProfesional: urlProfesional
        }
        eventoRefNew.update(dataEventoNew).then( ()=>{
            console.log('Data ingresada en la nueva sesion')
        })

    }


}