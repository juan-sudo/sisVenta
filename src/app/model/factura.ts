import { Cliente } from "./cliente";
import { Detallefactura } from "./detallefactura";
import { Producto } from "./producto";
import { TipoFactura } from "./tipo-factura";
import { Usuario } from "./usuario";

export class Factura {
    id!:number;
    nroDocumento!:string;
    subtotal!:number;
    igv!:number;
    total!:number;
    estado!:string;
    cliente!:Cliente;
    usuario!:Usuario;
    detalleFactura:Array<Detallefactura>=[];
    tipoFactura!:TipoFactura;
    encontrado?:boolean;

    
  calcularIgv(){
    this.total = 0;
    this.detalleFactura.forEach((item: Detallefactura) => {
      this.total += item.calcularImporte();

    });
    this.igv=this.total*0.18;
    return this.igv;
  }
  calcularTotal(){
    this.total = 0;
    this.detalleFactura.forEach((item: Detallefactura) => {
      this.total += item.calcularImporte();

    });
    return this.total;
  }

 

  calcularSubTotal(){
   
    return  this.subtotal=this.calcularTotal()-this.calcularIgv();
  }
    
   
}
