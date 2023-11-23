import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlEndPoint: string = 'http://localhost:8080/role';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerRole(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+"/obtener/"+id)
  }

  listarPaginado(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"/listar/"+page);

  }
  guardar(role:Role):Observable<any>{

    return this.http.post<any>(this.urlEndPoint+"/form",role);

  }
  delete(id:number):Observable<any>{

    return this.http.delete<any>(this.urlEndPoint+"/eliminar/"+id);
  }
  actalizaRoles(role:Role):Observable<any>{
    return this.http.put(this.urlEndPoint+"/actualizar/"+role.id,role);
  }

  buscarDniRuc(dni:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/buscarDni/'+dni);

  }
  listarRoles():Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/listar');
  }
}
