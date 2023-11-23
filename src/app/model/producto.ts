import {Categoria} from './categoria';
export class Producto {
    id!:number;
    descripcion!:string;
    precio!:number;
    unidad!:string;
    categoria!:Categoria;
    encontrado?: boolean;

}
