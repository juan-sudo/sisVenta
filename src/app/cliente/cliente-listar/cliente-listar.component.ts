import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-listar',
  templateUrl: './cliente-listar.component.html',
  styleUrls: ['./cliente-listar.component.css']
})
export class ClienteListarComponent implements OnInit{

  ///clienteRecibidoDes!:Cliente;

  clientes:Cliente[]=[];
  paginador: any;
  clienteSeleccionado!:Cliente;

  dniBuscar:string='';
  todoCliente:Cliente[]=[];
  clienteRecibido:Cliente[]=[]

  constructor(private clienteService:ClienteService, public modalClienteForm:FormMClienteService, private activatedRoute:ActivatedRoute){

  }

  ngOnInit(): void {

    this.cargarCliente();

    this.modalClienteForm.notificarUpload.subscribe(cliente => {
      
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.dniRuc = cliente.dniRuc;
          clienteOriginal.nombreCliente = cliente.nombreCliente;
          clienteOriginal.direccion = cliente.direccion;
        }
        return clienteOriginal;
      })
    })

    this.modalClienteForm.get('envio').subscribe((cliente: Cliente) => {
      console.log('emitido por event:',cliente);

      if (cliente) {
        
        this.clientes.unshift(cliente);
      }
    });
  

   

   
   


    this.actualizarLista();

    this.listarTodoCliente();

  
  }



  cargarCliente(){
    this.activatedRoute.paramMap.subscribe(
      params => {
          let pageString: string|null = params.get('page');
          let page: number = pageString ? +pageString : NaN;
    
          if (!page) {
    
            page = 0;
          }
          if(page==undefined||page==null){
            page=0
          }

          
    
          this.clienteService.listarPaginado(page).subscribe(response => {
            //this.clientes.unshift(this.clienteRecibidoDes);
            
              this.clientes = response.clientes.content as Cliente[];

              //this.cargarGuardar();

              console.log('lista de cliente paginado:',this.clientes);
              //console.log('cliente enviado',this.clienteRecibido);
              
              // if (this.clienteRecibidoDes) {
              //   //this.cargarGuardar();
              //   this.clientes.unshift(this.clienteRecibidoDes); // Agregar al principio de la lista
              //   //this.clientes = [...clientesRe, ...response.clientes.content as Cliente[]];
              // } 

              
              this.paginador = response.clientes;
            
              
            }); 
        });
        
  
  }

  listarTodoCliente(){
    this.clienteService.listarClientes().subscribe({
      error:(error)=>{

      },next:(res)=>{
        this.todoCliente=res.clientes

      }
    })

  }


  buscarCliente(){

    
    this.clienteService.buscarDniRuc(this.dniBuscar).subscribe({
      error:(error)=>{
        console.log("cocuerrio un error"+error);

      },next:(res)=>{

        if(res.cliente!==null){

        

        const clienteId = res.cliente.id;

        const objetoBuscado = this.todoCliente.find(cliente => cliente.id === clienteId);
        

       

        if (objetoBuscado) {
          // Agrega el cliente al principio de la lista clientes
          objetoBuscado.encontrado=true;
          
          this.clientes=this.clientes.filter(cliente => cliente.id !== clienteId);

        this.clientes.unshift(objetoBuscado);
      
          // Actualiza el paginador si es necesario
          // Puedes necesitar reasignar el paginador o utilizar métodos específicos para actualizarlo.
          this.paginador = this.paginador;
        }
      }
       
        
        else {
          console.log("no se encontro");
          Swal.fire('Warnig',`El cliente no exite en la base de datos `,'warning');
        }


    //     console.log(res.cliente.dniRuc);
    //     let objetoBuscado = this.todoCliente.find(cliente => cliente.dniRuc === res.cliente.dniRuc);

    //     if(objetoBuscado){
    //       console.log(objetoBuscado);

    //       const index = this.todoCliente.indexOf(objetoBuscado);
    //       console.log(index);

    //       //this.clientes.unshift(objetoBuscado);
    // if (index !== -1) {
    //   console.log(this.clientes);
    //   this.clientes.splice(index, 1);
    //   console.log(this.clientes);
      
    // } else {
    //   console.log("Error: No se encontró el objeto en todoCliente");
    // }

    // Agrega el cliente al principio de la lista clientes
    //this.clientes.unshift(objetoBuscado);
  // } else {
  //   console.log("No se encontró el objeto");
  // }
          // const index = this.todoCliente.indexOf(objetoBuscado);

          //  // Elimina el objeto de su ubicación actual
          // if (index !== -1) {

          //   this.todoCliente.splice(index, 1);

          //   this.clientes.unshift(objetoBuscado);

            
         // }
           // Agrega el objeto a la primera página (asumiendo que la primera página es la de índice 0)
         //this.clientes.splice(0, 0, objetoBuscado);
  
         // Actualiza el paginador
         //this.paginador = this.paginador; // Puedes necesitar reasignar el paginador o utilizar métodos específicos para actualizarlo.
  
        // }else{
        //   console.log("no existe");
        
      
      //}
      
        
      }

    })
      

    }
  



  editarCliente(cliente:Cliente){
    this.modalClienteForm.abrirModal();
    this.clienteSeleccionado=cliente;

    

  }

  elimarCliente(cliente:Cliente){

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar ${cliente.nombreCliente}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el elemento
        this.clienteService.delete(cliente.id).subscribe({
          error:(error)=>{

          },next:(res)=>{
            this.clientes=this.clientes.filter(cli=>cli.id!==cliente.id);
            Swal.fire('Eliminado', 'El cliente  ha sido eliminado', 'success');

          }
        })

        
      }
    });

   
  }

  


  actualizarLista(){
   

    // this.modalClienteForm.notificarUpload.subscribe(cliente => {
    //   this.clientes = cliente;
    // })
      
  }

  abrirModal(){

    //this.docuemntoSeleccionado=documento;

  this.modalClienteForm.abrirModal();
  this.clienteSeleccionado=new Cliente();
    


  }


}
