export interface session {
    id: string,
    title: string,
    start: string,
    end: string,
    nombreProfesional: string,
    uid: string,
    especialidad: string,
    disponible: boolean,
    fechaTomada?: Date,  // Fecha de cuando se agendo la hora  --- OPCIONAL
    pacienteUID?: string // uid del paciente  --- opcional mientras no este agendado
    
}