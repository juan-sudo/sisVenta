import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerUsuario(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+"/obtener/"+id)
  }

  listarPaginado(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"/listar/"+page);

  }
  guardar(usuario:Usuario):Observable<any>{

    return this.http.post<any>(this.urlEndPoint+"/form",usuario);

  }
  delete(id:number):Observable<any>{

    return this.http.delete<any>(this.urlEndPoint+"/eliminar/"+id);
  }
  actalizarUsuario(usuario:Usuario):Observable<any>{
    return this.http.put(this.urlEndPoint+"/actualizar/"+usuario.id,usuario);
  }

  buscarDniRuc(dni:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/buscar/'+dni);

  }
  listarUsuarios():Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/listar');
  }
}
