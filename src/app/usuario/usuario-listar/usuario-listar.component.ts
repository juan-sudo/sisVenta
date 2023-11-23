import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Usuario } from 'src/app/model/usuario';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {
  paginador: any;
  usuarioSeleccionado!:Usuario;

  dniBuscar="";

  todosuario:Usuario[]=[];

  

  usuarios:Usuario[]=[];

  constructor( public modalFomCliente:FormMClienteService, private usarioService:UsuarioService,  private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {

    this.cargarUsuario();
    
    this.modalFomCliente.get('envio').subscribe((usuario: Usuario) => {
      console.log('emitido por event:',usuario);

      if (usuario) {
        // Agregar el nuevo cliente al principio de la lista
        this.usuarios.unshift(usuario);
      }
    });

    this.listarTodoUsuario();
  
    
  }

  listarTodoUsuario(){
    this.usarioService.listarUsuarios().subscribe({
      error:(error)=>{
        console.log("ocurrio un error al traer usuarios");

      },next:(res)=>{
        this.todosuario=res.usuarios;
      }
    })

  }

  

  buscarUsuario(){
    this.usarioService.buscarDniRuc(this.dniBuscar).subscribe({
      error:(error)=>{
       Swal.fire('Error',`${error.error.error}`,'error');

      },next:(res)=>{
        const usuarioId=res.usuario.id;
        
        

        const objetoEncontrado=this.todosuario.find(usuario=>usuario.id===usuarioId);
        

        if(objetoEncontrado){
          
          objetoEncontrado.encontrado=true;
         
          this.usuarios=this.usuarios.filter(usuario=>usuario.id!==usuarioId);
          this.usuarios.unshift(objetoEncontrado);
         

        }
      }
    })

    

  }

  

  cargarUsuario(){

    this.activatedRoute.paramMap.subscribe(
      params=>{
        let paginacion:string|null=params.get('page');
        let page:number=paginacion?+paginacion:NaN;

        if(!page){
          page=0;
        }
        this.usarioService.listarPaginado(page).subscribe({
          error:(error)=>{
            console.log("ocurrio un error");

          },next:(res)=>{
            
            this.usuarios=res.usuarios.content as Usuario[];

            this.paginador=res.usuarios



          }

        })
    


      }
    )


   

  }

 

  abrirModal(){

    //this.docuemntoSeleccionado=documento;

  this.modalFomCliente.abrirModal();
  this.usuarioSeleccionado=new Usuario();
    


  }
  editarUsuario(usuario:Usuario){
    this.modalFomCliente.abrirModal();
    this.usuarioSeleccionado=usuario;

  }

  elimarUsuario(usuario:Usuario){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estas seguro de eliminar a ${usuario.nombres}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para eliminar el elemento
        this.usarioService.delete(usuario.id).subscribe({
          error:(error)=>{
            Swal.fire('Error',`${error.mensaje}`,'error');

          },next:(res)=>{
            this.usuarios=this.usuarios.filter(cli=>cli.id!==usuario.id);
            Swal.fire('Eliminado', `${res.mensaje}`, 'success');

          }
        })

        
      }
    });

  }

}
