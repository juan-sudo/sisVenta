import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteListarComponent } from './cliente/cliente-listar/cliente-listar.component';
import { InicioComponent } from './inicio/inicio/inicio.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { ProductoListarComponent } from './producto/producto-listar/producto-listar.component';
import { VentaListarComponent } from './venta/venta-listar/venta-listar.component';
import { VentaFormComponent } from './venta/venta-form/venta-form.component';

const routes: Routes = [
  {path:'',component:InicioComponent,pathMatch:'full'},
  {path:'listarCliente',component:ClienteListarComponent},
   {path:'listarCliente/:page',component:ClienteListarComponent},
   {path:'listarUsuario',component:UsuarioListarComponent},
   {path:'listarUsuario/:page',component:UsuarioListarComponent},
   {path:'listarProducto',component:ProductoListarComponent},
   {path:'listarProducto/:page',component:ProductoListarComponent},
   {path:'listarFactura',component:VentaListarComponent},
   {path:'listarFactura/:page',component:VentaListarComponent},
   {path:'formVenta',component:VentaFormComponent},
   



   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
