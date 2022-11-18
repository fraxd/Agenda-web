export interface configSession{
    lunes: horasSesion;
    martes: horasSesion;
    miercoles: horasSesion;
    jueves: horasSesion;
    viernes: horasSesion;
    duracion: number;
    valor: number;
}

export interface horasSesion{
    activo: boolean;
    horaInicio: Date;
    horaFin: Date;
}
