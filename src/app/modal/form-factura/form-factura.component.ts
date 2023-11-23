import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/model/cliente';
import { Detallefactura } from 'src/app/model/detallefactura';
import { Factura } from 'src/app/model/factura';
import { Producto } from 'src/app/model/producto';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.css']
})
export class FormFacturaComponent implements OnInit {
  @Input() facturaRecibido!:Factura;
  productoForm!:FormGroup;
  productoRecibido!:Factura;
  productos:any[]=[];
  factura:Factura=new Factura();
  errorMessage:string='';
  //detalle = { cantidad: 1 };
  detalle = { cantidad: 1 };



  dniBuscar!:string;
  buscarTexto!:string;

  clienteSeleccionado!:Cliente;



  isEmptyObject(obj: any): boolean {
    return obj !== undefined && obj !== null && Object.keys(obj).length === 0;
  }
  

  constructor(private productoService:ProductoService, public clienteMosalService:FormMClienteService, private ventaService:VentaService){

  }

  ngOnInit(): void {
    console.log('hola');

    // Obtener los datos de los productos
   // const res = this.productoService.filtrarProducto(this.buscarTexto);

    // Convertir el array de objetos anidados en un array de objetos
    //this.productos = res.json().productos.flat()
    
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad: number = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }


      this.factura.detalleFactura = this.factura.detalleFactura.map((item: Detallefactura) => {
        if (id === item.producto.id) {
          item.cantidad = cantidad;
        }
        return item;
      });

      
      //this.cdr.detectChanges();

  
  }

  eliminarItemFactura(id: number): void {
    this.factura.detalleFactura = this.factura.detalleFactura.filter((item: Detallefactura) => id !== item.producto.id);
  }
  seleccionarProducto(producto: Producto){
    
  // if(this.existItem(producto.id)){
  //   this.incrementarCantidad(producto.id);
  // }
  
  //else{
    let nuevoItem=new Detallefactura();
    nuevoItem.producto=producto;
   
    //nuevoItem.cantidad=this.cantidad;
    
    this.factura.detalleFactura.push(nuevoItem);

    
  

//   }
//   this.searchText='';
  
//   this.productos.length=0;
//   this.autocompleteControl.setValue('');
//     this.obtenerValorInput();
//  // this.focus(producto.id);
//  console.log(this.pedido.detallePedidos)

 
    


      // if(this.existItem(producto.id)){
      //   this.incrementarCantidad(producto.id);
      // }
      
      //else{
        // let nuevoItem=new DetallePedido();
        // nuevoItem.producto=producto;
       
        // nuevoItem.cantidad=this.item.cantidad;
        
        // this.pedido.detallePedidos.push(nuevoItem);
    
        
      
    
     // }
    //   this.searchText='';
      
    //   this.productos.length=0;
    //   this.autocompleteControl.setValue('');
    //     this.obtenerValorInput();
    //  // this.focus(producto.id);
    //  console.log(this.pedido.detallePedidos)
    
     
    
    
       
      

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
     // this.errorMessage = '';
    }
  }
  

  abrirModal(){
    this.clienteMosalService.abrirModal();
    this.clienteSeleccionado=new Cliente();

  }
 
  // async buscarCliente() {
  //   try {
  //     const dni = await this.ventaService.getDni('70503676');
  
  //     console.log(dni);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  

  // async getDni() {
  //   const dni = await this.ventaService.getDni(this.dniBuscar);

  //   console.log(dni);
  // }

  productoGuardar(){

  }

  productoActualizar(){
    
  }

}
