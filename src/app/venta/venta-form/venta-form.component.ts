import { Component } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { Factura } from 'src/app/model/factura';
import { Producto } from 'src/app/model/producto';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.css']
})
export class VentaFormComponent {
  productos:any[]=[];
  factura!:Factura;
  errorMessage:string='';

  dniBuscar!:string;
  buscarTexto!:string;

  clienteSeleccionado!:Cliente;

  constructor(private productoService:ProductoService, public clienteMosalService:FormMClienteService, private ventaService:VentaService){

  }

  seleccionarProducto(producto: Producto){
  }

  onSearch(){
    console.log(this.buscarTexto);
    if (this.buscarTexto.trim().length > 2) {
     this.productoService.filtrarProducto(this.buscarTexto).subscribe(
        {
          error:(error:any)=>{
            this.productos = [];
         this.errorMessage = 'Ocurrió un error: ' + error.message;
         console.log("ocurrio un error",error);
          },next:(res:any)=>{
           this.productos = res.productos

           //const hola=res.productos;
          
           

            //this.productos = res.json().productos.flat();
            console.log('antes::::',this.productos);

            
         //this.errorMessage = '';
          console.log("esta aqui");
         if (this.productos.length === 0 && this.buscarTexto.trim().length > 4) {
           this.errorMessage = 'El producto no existe';
           console.log(this.errorMessage);
           }

          }
        }
        

      


       
      );

      
    } else {
      this.productos = [];
     this.errorMessage = '';
    }
  }
  

  abrirModal(){
    this.clienteMosalService.abrirModal();
    this.clienteSeleccionado=new Cliente();

  }

}
