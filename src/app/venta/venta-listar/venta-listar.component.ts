import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Factura } from 'src/app/model/factura';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta-listar',
  templateUrl: './venta-listar.component.html',
  styleUrls: ['./venta-listar.component.css']
})
export class VentaListarComponent implements OnInit {

  nroFacturaBuscar=""

  facturaDetalleSeleccionado!:Factura;

  facturas:Factura[]=[];

  paginador:any;
  facturaSeleccionado!:Factura;

  constructor(public formMClienteService:FormMClienteService, private ventaService:VentaService, private activatRoute:ActivatedRoute){

  }

  ngOnInit(): void {

    this.activatRoute.paramMap.subscribe(params=>{

      const pagestring:string|null=params.get('page');

      let page:number=pagestring?+pagestring:NaN;
      if(!page){
        page=0
      }



      this.ventaService.listarPaginado(page).subscribe({
        error:(error)=>{
          console.log("ocurrio un erro al cargar fctura");

        },next:(res)=>{
          this.facturas=res.facturas.content
          console.log('etsa es la factura a cargar....', this.facturas=res.facturas.content);
          this.paginador=res.facturas
        }
      })
        

      

    })

    
    
  }

  detalleFactura(factura:Factura){
    this.formMClienteService.abrirModal();
    this.facturaDetalleSeleccionado=factura;

    console.log('factura que va: ', this.facturaSeleccionado);



    
  }

  editarFactura(factura:Factura){


  }

  verDetalleVenta(){
    console.log("Estas en ver");

  }

  elimarFactura(factura:Factura){

  }

  buscarFactura(){
    this.ventaService.buscarNroFactura(this.nroFacturaBuscar).subscribe({
      error:(error)=>{
      console.log("Ocurrio un error al buscar");
      },next:(res)=>{
        console.log('factura buscado: ',res);
      }
    })

  }

  abrirModal(){
    this.formMClienteService.abrirModal();
    this.facturaSeleccionado=new Factura();
    console.log("aqui estas.....");

  }

}
