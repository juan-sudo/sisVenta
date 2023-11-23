import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Factura } from 'src/app/model/factura';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})
export class VerFacturaComponent implements OnInit {

  @Input() facturaDetalleRecibe!:Factura;

  detalle!:Factura;

  usuarioForm!:FormGroup;

  constructor(public clienteMosalService:FormMClienteService){

  }

  ngOnInit(): void {
    this.cargarDetalle();

    console.log('est es el detalle factura',this.facturaDetalleRecibe);
    
    
  }

 
  cargarDetalle(){
    this.detalle=this.facturaDetalleRecibe;
    console.log('detalle que se revice',this.detalle);



    
  }



  imprimirFactura(){

  }

  Cancelar(){

  }

}
