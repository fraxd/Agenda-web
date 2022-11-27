export interface session {
    id: string,
    title: string,
    start: string,
    end: string,
    nombreProfesional: string,
    uid: string, // UID DEL PROFESIONAL!
    especialidad: string,
    disponible: boolean,
    urlProfesional?: string,
    fechaTomada?: Date, // Fecha de cuando se agendo la hora  --- OPCIONAL
    pacienteUID?: string // uid del paciente  --- opcional mientras no este
    color?: string // Color del evento- disponible, Reservado y bloqueado)
} // VERDE: DISPONIBLE , AMARILLO RESERVADO Y ROJO NO DISPONIBLe
