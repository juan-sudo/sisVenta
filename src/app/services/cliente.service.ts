import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';


@Injectable({
  providedIn: 'root'
})


export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerCliente(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+"/obtener/"+id)
  }

  listarPaginado(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"/listar/"+page);

  }
  guardar(cliente:Cliente):Observable<any>{

    return this.http.post<any>(this.urlEndPoint+"/form",cliente);

  }
  delete(id:number):Observable<any>{

    return this.http.delete<any>(this.urlEndPoint+"/eliminar/"+id);
  }
  actalizarCliente(cliente:Cliente):Observable<any>{
    return this.http.put(this.urlEndPoint+"/actualizar/"+cliente.id,cliente);
  }

  buscarDniRuc(dni:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/buscarDni/'+dni);

  }
  listarClientes():Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/listar');
  }

}
