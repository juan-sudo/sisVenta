import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = 'http://localhost:8080/categoria';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerCategoria(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+"/obtener/"+id)
  }

  listarPaginado(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"/listar/"+page);

  }
  guardar(categoria:Categoria):Observable<any>{

    return this.http.post<any>(this.urlEndPoint+"/form",categoria);

  }
  delete(id:number):Observable<any>{

    return this.http.delete<any>(this.urlEndPoint+"/eliminar/"+id);
  }
  actalizaCategoria(categoria:Categoria):Observable<any>{
    return this.http.put(this.urlEndPoint+"/actualizar/"+categoria.id,categoria);
  }

  buscarDniRuc(dni:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/buscarDni/'+dni);

  }
  listarCategoria():Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/listar');
  }
}
