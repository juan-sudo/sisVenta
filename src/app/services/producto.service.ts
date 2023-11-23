import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = 'http://localhost:8080/producto';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerUsuario(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+"/obtener/"+id)
  }

  listarPaginado(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"/listar/"+page);

  }
  guardar(producto:Producto):Observable<any>{

    return this.http.post<any>(this.urlEndPoint+"/form",producto);

  }
  delete(id:number):Observable<any>{

    return this.http.delete<any>(this.urlEndPoint+"/eliminar/"+id);
  }
  actalizarUsuario(producto:Producto):Observable<any>{
    return this.http.put(this.urlEndPoint+"/actualizar/"+producto.id,producto);
  }

  buscarCodigo(dni:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/buscar/'+dni);

  }
  listarUsuarios():Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/listar');
  }
  filtrarProducto(term:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/filtrar/'+term);
  }

}
