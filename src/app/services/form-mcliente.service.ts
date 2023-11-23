import { EventEmitter, Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../model/cliente';
import { ClienteService } from './cliente.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormMClienteService {
  modal=false;
 
  private subjects: { [key: string]: Subject<any> } = {};
  private _notificarUpload = new EventEmitter<any>();
 
  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

 

  get(key: string): Subject<any> {
    if (!this.subjects[key]) {
      this.subjects[key] = new Subject<any>();
    }
    return this.subjects[key];
  }

  emit(key: string, data: any): void {
    if (this.subjects[key]) {
      this.subjects[key].next(data);
    }
  }


  abrirModal(){
    this.modal=true;
  }
  cerrarModal(){
    this.modal=false;
   
    
}


}
