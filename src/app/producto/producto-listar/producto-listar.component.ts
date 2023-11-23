import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/model/producto';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css']
})
export class ProductoListarComponent implements OnInit, OnChanges {
  codigoBuscar="";

  paginador:any;
  productoSeleccionado!:Producto;

  productos:Producto[]=[];

  constructor(private productoService:ProductoService, private actvateRoute:ActivatedRoute, public modalFomCliente:FormMClienteService){

  }

  ngOnInit(): void {
    
    this.cargarProductoPaginado();

    this.modalFomCliente.get('envio').subscribe((producto: Producto) => {
      console.log('emitido por event:',producto);

      if (producto) {
        // Agregar el nuevo cliente al principio de la lista
        this.productos.unshift(producto);
      }
    });



    
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    
  }


  cargarProductoPaginado(){

    this.actvateRoute.paramMap.subscribe(param=>{
      let pageString=param.get('page');

      let page:number=pageString?+pageString:NaN;

      if(!page){
        page=0
      }

      this.productoService.listarPaginado(page).subscribe({
        error:(error)=>{
          console.log("ocurrio un error al listar");
        },next:(res)=>{
          this.productos=res.productos.content
          this.paginador=res.productos
        }
      })



    })




  }

 
  buscarProducto(){


  }

  editarProducto(producto:Producto){
    this.modalFomCliente.abrirModal();
    this.productoSeleccionado=producto;


  }

  elimarProducto(producto:Producto){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar ${producto.descripcion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el elemento
        this.productoService.delete(producto.id).subscribe({
          error:(error)=>{
            Swal.fire('Error','Ocurrio un error al eliminr producto', 'error');


          },next:(res)=>{
            this.productos=this.productos.filter(cli=>cli.id!==producto.id);
            Swal.fire('Eliminado', `${res.mensaje}`, 'success');

          }
        })

        
      }
    });


  }

  abrirModal(){
    this.modalFomCliente.abrirModal();
    this.productoSeleccionado=new Producto();

  }

}
