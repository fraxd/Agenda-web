export interface session {
    id: string,
    title: string,
    start: string,
    end: string,
    nombreProfesional: string,
    uid: string,  // UID DEL PROFESIONAL!
    especialidad: string,
    disponible: boolean,
    fechaTomada?: Date,  // Fecha de cuando se agendo la hora  --- OPCIONAL
    pacienteUID?: string // uid del paciente  --- opcional mientras no este agendado
    color?: string // Color del evento (probablemente 3 colores a definir -- disponible, Reservado y bloqueado)
}                   // VERDE: DISPONIBLE , AMARILLO RESERVADO Y ROJO NO DISPONIBLE (por opcion del profesional)