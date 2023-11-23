import { Role } from "./role";

export class Usuario {
    id!:number;
    nombres!:string;
    apellidoPaterno!:string;
    apellidoMaterno!:string;
    usuario!:string;
    contrasena!:string;
    dni!:string;
    role!:Role;
    encontrado?: boolean;

}
