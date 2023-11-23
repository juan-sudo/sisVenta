import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import Swal from 'sweetalert2';

function soloNumeros(control:FormControl) {
  const valor = control.value;
  if (valor && isNaN(Number(valor))) {
    return { soloNumeros: true };
  }
  return null;
}



@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  @ViewChild('cerraModalP') cerraModalP!: ElementRef;

  guardadoEnProgreso: boolean = false;

  @Input() clienteRecibido!:Cliente;
  mostrarModal: boolean = true;
  


  clienteForm: FormGroup;

  

 


  
  

  constructor(public clienteMosalService:FormMClienteService, private clienteService:ClienteService, private formBuilder: FormBuilder){
    
    this.clienteForm = this.formBuilder.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      dniRuc: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14), soloNumeros]],
      direccion: ['', [Validators.required, Validators.minLength(3)]],
    });

  }

  ngOnInit(): void {

    console.log("aquiiii",this.clienteRecibido)

    

    
    
    
  }

  isEmptyObject(obj: any): boolean {
    return obj !== undefined && obj !== null && Object.keys(obj).length === 0;
  }
  


  cerrarModalpp() {
    // Obtén la referencia del formulario
    const modalForm = this.cerraModalP.nativeElement;
  
    // Obtén el modal padre a través del formulario
    const modalElement = modalForm.closest('.modal');
  
    // Cierra el modal
    if (modalElement) {
      modalElement.classList.remove('fade');
      modalElement.style.display = 'none';
    }
  }

  
 
  
  
  
  //CARGAR CLIENTE EN ACTUALIZAR

  ngOnChanges(changes: SimpleChanges) {

    console.log(this.clienteRecibido);
    if (changes['clienteRecibido'] && changes['clienteRecibido'].currentValue) {
      const cliente = changes['clienteRecibido'].currentValue;
      this.clienteForm.patchValue({
        nombreCliente: cliente.nombreCliente,
        dniRuc: cliente.dniRuc,
        direccion: cliente.direccion,
      });
      // this.clienteForm.get('dniRuc')?.disable();
     // this.nuevoCliente = false; // Estamos editando un cliente existente
    } else {
      // this.clienteForm.get('dniRuc')?.enable();
      this.clienteForm.reset();
      
      //this.nuevoCliente = true; // Estamos creando un nuevo cliente
    }
  }

  

  actualizarCliente(){

    if (this.guardadoEnProgreso) {
      return; // Evitar clics adicionales mientras se procesa
    }
  
    // Deshabilita el botón y cambia el estado a guardado en progreso
    this.guardadoEnProgreso = true;
    const clienteData = this.clienteForm.value;

    if (this.clienteRecibido) {
      // Si clienteRecibido existe, estamos actualizando un cliente existente
      // Puedes utilizar el clienteRecibido para obtener el ID u otra información que identifique al cliente
      clienteData.id = this.clienteRecibido.id; // Supongamos que el ID del cliente es "id"
      // Llamar al servicio para actualizar el cliente

      this.clienteService.actalizarCliente(clienteData).subscribe(
        {
          next: (res) => {
           
            this.clienteForm.reset();
            //this.mostrarModal = false;

            const clienteE=res.cliente as Cliente;
            this.clienteMosalService.notificarUpload.emit(clienteE);

            this.clienteMosalService.cerrarModal();
            
            Swal.fire('Éxito', `El cliente ${clienteData.nombreCliente} se ha actualizado con éxito`, 'success');
            //this.cerrarModalpp();
            this.guardadoEnProgreso = false;
            // Eliminar el div del fondo del modal
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
              modalBackdrop.remove();
            }

            
            
          },
          error: (error) => {
            console.log('Ocurrroio un error',clienteData)
            // Manejar el error
            if (error.status === 500) {
              Swal.fire('Error', `${error.error.error}`, 'error');
            } else {
              Swal.fire('Error', 'Ocurrió un error al actualizar el cliente', 'error');
            }
            this.guardadoEnProgreso = false;
          }
        }
      );
    } 

  }

  guardarCliente() {

    if (this.guardadoEnProgreso) {
      return; // Evitar clics adicionales mientras se procesa
    }
  
    // Deshabilita el botón y cambia el estado a guardado en progreso
    this.guardadoEnProgreso = true;

    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value; // Obtener los datos del formulario
  
      
        this.clienteService.guardar(clienteData).subscribe(
          {
            next: (res) => {
              
              this.clienteMosalService.emit('envio',res.cliente);
              

              this.clienteForm.reset();
              Swal.fire('Éxito', `El cliente ${clienteData.nombreCliente} se ha guardado con éxito`, 'success');
              this.guardadoEnProgreso = false;
              
            },
            error: (error) => {
              // Manejar el error
              if (error.status === 500) {
                Swal.fire('Error', `${error.error.error}`, 'error');
              } else {
                Swal.fire('Error', 'Ocurrió un error al guardar el cliente', 'error');
              }
              this.guardadoEnProgreso = false;
            }
          }
        );
      // }
    }
  }
  


  cerrarModal(){
    this.clienteMosalService.cerrarModal();

  }



}
