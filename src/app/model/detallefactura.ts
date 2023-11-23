import { Factura } from "./factura";
import { Producto } from "./producto";

export class Detallefactura {
    id!:number;
    cantidad!:number;
    importe!:number;
    producto!:Producto;
    factura!:Factura;

    public calcularImporte(){
        return this.importe=this.producto.precio*this.cantidad;
    }
}
