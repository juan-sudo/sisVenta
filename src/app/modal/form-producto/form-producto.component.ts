import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/model/categoria';
import { Producto } from 'src/app/model/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { FormMClienteService } from 'src/app/services/form-mcliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit, OnChanges {
  guardadoEnProgreso=false;
  @Input() productoRecibido!:Producto;
  productoForm: FormGroup;
  categorias:Categoria[]=[];
  producto!:Producto;
  categoriaSelect!: FormControl;

  categoriaSeleccionada: Categoria | undefined;

  isEmptyObject(obj: any): boolean {
    return obj !== undefined && obj !== null && Object.keys(obj).length === 0;
  }
  
 

  constructor( private productoService:ProductoService,private categoriaService:CategoriaService,public clienteMosalService:FormMClienteService,private formBuilder:FormBuilder){
     
    this.productoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      unidad: ['', Validators.required],
      
      categoria: this.formBuilder.group({
        id: [1], // Agrega el control 'id' al FormGroup 'role'
        // nombreRole: ['admin'] // Agrega otros controles de 'role' si es necesario
      })
    });


  }

  ngOnInit(): void {
    this.cargarCategoria();
    console.log('producto selecionado',this.productoRecibido)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productoRecibido'] && changes['productoRecibido'].currentValue){
      const producto=changes['productoRecibido'].currentValue
      this.productoForm.patchValue({
        descripcion: producto.descripcion,
        precio: producto.precio,
         unidad: producto.unidad,
         categoria:producto.categoria.id

         
      
      

      })
        // Seleccionar la categoría por defecto
        const categoria = producto.categoria
        this.categoriaSeleccionada = this.categorias.find(c => c.nombre === producto.nombre) ?? this.categorias[0];

        this.selectCategoria(this.categoriaSeleccionada)
    }
    
  }
  selectCategoria(categoria: Categoria) {
    this.categoriaSelect.setValue(categoria.id)
  }

  
 

  cargarCategoria(){
    this.categoriaService.listarCategoria().subscribe({
      error:(error)=>{

      },next:(res)=>{
        this.categorias=res.categorias
        console.log(this.categorias);

      }
    })
  }
  onRoleSelectionChange(event: any) {
    const categoriaId = event.target.value;
   
    this.productoForm.get('categoria.id')?.setValue(categoriaId);
    
    
  }


  productoGuardar(){

    if (this.guardadoEnProgreso) {
      return ; // Evitar clics adicionales mientras se procesa
    }

    this.guardadoEnProgreso = true;

    if (this.productoForm.valid) {


    this.producto=this.productoForm.value

    console.log('esto es guardado:::',this.producto);

    this.productoService.guardar(this.producto).subscribe({
      error:(erro)=>{
        Swal.fire('Error','Ocurrio al guaradd usuario','error');
        this.guardadoEnProgreso = false;

      },next:(res)=>{

        this.clienteMosalService.emit('envio',res.producto);
        console.log('Este es el usuario que se envia',res.usuario)
              

        this.productoForm.reset();
        Swal.fire('Exito',`El ${res.producto.descripcion} se ha guardado correctamente`,'success');
        this.guardadoEnProgreso = false;
        

      }
    })
  }

  }

  productoActualizar(){

  }
  



}
