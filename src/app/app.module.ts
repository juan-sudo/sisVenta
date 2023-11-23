import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenulateralComponent } from './menu/menulateral/menulateral.component';
import { InicioComponent } from './inicio/inicio/inicio.component';

import { ClienteListarComponent } from './cliente/cliente-listar/cliente-listar.component';
import { PaginatorComponent } from './paginador/paginator/paginator.component';


import { HttpClientModule } from '@angular/common/http';
import { FormClienteComponent } from './modal/form-cliente/form-cliente.component';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { FormUsuarioComponent } from './modal/form-usuario/form-usuario.component';
import { PaginadorUsuarioComponent } from './paginador/paginador-usuario/paginador-usuario.component';
import { ProductoListarComponent } from './producto/producto-listar/producto-listar.component';
import { FormProductoComponent } from './modal/form-producto/form-producto.component';
import { PaginadorProductoComponent } from './paginador/paginador-producto/paginador-producto.component';
import { VentaListarComponent } from './venta/venta-listar/venta-listar.component';
import { FormFacturaComponent } from './modal/form-factura/form-factura.component';
import {PaginadorVentaComponent} from './paginador/paginador-venta/paginador-venta.component';
import { VerFacturaComponent } from './modal/ver-factura/ver-factura.component';
import { VentaFormComponent } from './venta/venta-form/venta-form.component';
import { IgvPipe } from './pipe/igv.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MenulateralComponent,
    InicioComponent,
   
   
   
    ClienteListarComponent,
    PaginatorComponent,
    FormClienteComponent,
    UsuarioListarComponent,
    FormUsuarioComponent,
    PaginadorUsuarioComponent,
    ProductoListarComponent,
    FormProductoComponent,
    PaginadorProductoComponent,
    VentaListarComponent,
    FormFacturaComponent,
    PaginadorVentaComponent,
    VerFacturaComponent,
    VentaFormComponent,
    IgvPipe
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
