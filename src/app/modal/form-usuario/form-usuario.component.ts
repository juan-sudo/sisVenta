import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from 'src/app/model/role';
import { Usuario } from 'src/app/model/usuario';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit, OnChanges {

  @Input() usuarioRecibido!:Usuario;

  usuarioForm: FormGroup;

  selectedRoleId!: number; 

  usuario!:Usuario;

  roles:Role[]=[];

  guardadoEnProgreso: boolean = false;

  isEmptyObject(obj: any): boolean {
    return obj !== undefined && obj !== null && Object.keys(obj).length === 0;
  }
  
  constructor(private roleService:RolesService,private formBuilder: FormBuilder, public clienteMosalService:FormMClienteService, private usuarioService:UsuarioService){
    
    this.usuarioForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dni: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      role: this.formBuilder.group({
        id: [1], // Agrega el control 'id' al FormGroup 'role'
        // nombreRole: ['admin'] // Agrega otros controles de 'role' si es necesario
      })
    });

    //     this.usuarioForm = this.formBuilder.group({
    //   nombres: ['', [Validators.required, Validators.minLength(3)]],
    //   apellidoPaterno: ['', [Validators.required, Validators.minLength(3)]],
    //   apellidoMaterno: ['', [Validators.required, Validators.minLength(3)]],
    //   usuario: ['', [Validators.required, Validators.minLength(3)]],
    //   contrasena: ['', [Validators.required, Validators.minLength(3)]],
    //   dni: ['', [Validators.required, Validators.minLength(8)]],
    //   role: this.formBuilder.group({
    //     id: [null],
    //     nombreRole: [null]
    //   }, { validators: Validators.required 
      
    //   })
    // });
    
   
    
  }

  

  ngOnInit(): void {
    this.cargarRoles();
    
  }
  //CARGAR LOS VALORES DEL USUARIO PARA ACTUALIZAR

  ngOnChanges(changes: SimpleChanges): void {

    console.log('usuario listo para cargar',this.usuarioRecibido);
    if(changes['usuarioRecibido'] && changes['usuarioRecibido'].currentValue){
      const usuario=changes['usuarioRecibido'].currentValue;
      this.usuarioForm.patchValue({
        nombres: usuario.nombres,
      apellidoPaterno: usuario.apellidoPaterno,
      apellidoMaterno: usuario.apellidoMaterno,
      usuario: usuario.usuario,
      contrasena: usuario.contrasena,
      dni:usuario.dni,
      id: usuario.role?.id
        

      })
    }


  }
  onRoleSelectionChange(event: any) {
    const roleId = event.target.value;
   
    this.usuarioForm.get('role.id')?.setValue(roleId);
  
  }

  cargarRoles(){
    this.roleService.listarRoles().subscribe({
      error:(roles)=>{
        console.log("ocurrio error al cargar role",roles);

      },next:(res)=>{

        this.roles=res.roles;
        console.log(this.roles);

      }
    })

  }


  usuarioGuardar(){
    //console.log('El usuario que se carga',this.usuarioForm.value);

    if (this.guardadoEnProgreso) {
      return ; // Evitar clics adicionales mientras se procesa
    }

    this.guardadoEnProgreso = true;

    if (this.usuarioForm.valid) {


    this.usuario=this.usuarioForm.value

    console.log(this.usuario);

    this.usuarioService.guardar(this.usuario).subscribe({
      error:(erro)=>{
        Swal.fire('Error','Ocurrio al guaradd usuario','error');
        this.guardadoEnProgreso = false;

      },next:(res)=>{

        this.clienteMosalService.emit('envio',res.usuario);
        console.log('Este es el usuario que se envia',res.usuario)
              

        this.usuarioForm.reset();
        Swal.fire('Exito',`El ${res.usuario.nombres} se ha guardado correctamente`,'success');
        this.guardadoEnProgreso = false;
        

      }
    })
  }

  }

  usuarioActualizar(){

    if(this.guardadoEnProgreso){
      return
    }

    const usuarioData=this.usuarioForm.value;

    this.guardadoEnProgreso=true;
    if(this.usuarioRecibido){
      usuarioData.id=this.usuarioRecibido.id;

      this.usuarioService.actalizarUsuario(usuarioData).subscribe({
        error:(error)=>{
          
          if (error.status === 500) {
            Swal.fire('Error', `${error.error.error}`, 'error');
          } else {
            Swal.fire('Error', 'Ocurrió un error al actualizar el usuario', 'error');
          }
          this.guardadoEnProgreso=false;

        },next:(res)=>{

          const usuarioEmit=res.usuario as Usuario;
          this.clienteMosalService.notificarUpload.emit(usuarioEmit);

          this.usuarioForm.reset();
          this.clienteMosalService.cerrarModal();

          Swal.fire('Exito',`El usuario ${usuarioData.nombreCliente} se ha actualizado con exito`,'success')
          // Eliminar el div del fondo del modal
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
          this.guardadoEnProgreso=false;

        }
      })
    }



  }




}
