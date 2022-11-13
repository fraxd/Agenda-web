import * as admin from 'firebase-admin';


export class notifyEmail {
    
    

    async aperturaAgendaNotify(db:admin.firestore.Firestore, uid:string, fechaPartida:Date,fechaUltima:Date){
        // let temp = await db.doc(`users/${uid}`).get();
        let fechaInicio = fechaPartida.toLocaleDateString();
        let fechaFin = fechaUltima.toLocaleDateString();
        // let user = temp.data();
        db.collection('mail').add({
            toUids: [uid],
            subject: '¡Haz abierto tu agenda!',
            message: {
                html: `
                <b>Estimad@</b>, <br>
                Haz abierto tu agenda para que los pacientes puedan agendar una sesion contigo. 
                Desde el dia ${fechaInicio} hasta el dia ${fechaFin}. <br>
                ¡Saludos!
                     `,
            },
            
            
        }).then( () => console.log('email enviado'))

    }
}

// template: {
//     name: 'agendaAbierta',
//     data:{
//         fechaInicio: fechaPartida,
//         fechaFin: fechaUltima
//  