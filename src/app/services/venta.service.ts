import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Factura } from '../model/factura';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private urlEndPoint: string = 'http://localhost:8080/factura';

  constructor(private http: HttpClient, private router: Router) { }

  obtenerUsuario(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+"/obtener/"+id)
  }

  listarPaginado(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+"/listar/"+page);

  }
  guardar(factura:Factura):Observable<any>{

    return this.http.post<any>(this.urlEndPoint+"/form",factura);

  }
  delete(id:number):Observable<any>{

    return this.http.delete<any>(this.urlEndPoint+"/eliminar/"+id);
  }
  actalizarUsuario(factura:Factura):Observable<any>{
    return this.http.put(this.urlEndPoint+"/actualizar/"+factura.id,factura);
  }

  buscarNroFactura(nro:string):Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/buscar/'+nro);

  }
  listarUsuarios():Observable<any>{
    return this.http.get<any>(this.urlEndPoint+'/listar');
  }

  async getDni(numero: string) {
    const response = await axios.get(`https://api.apis.net.pe/v1/dni?numero=${numero}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer $TOKEN`,
      },
    });

    return response.data;
  }
}
