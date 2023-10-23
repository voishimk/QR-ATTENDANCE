import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunaService {
  apiUrl='https://dev.matiivilla.cl/duoc/location/comuna/' ;
  constructor(private http:HttpClient) { }

  getComuna(regionSeleccionada:String): Observable<any> {
    
    return this.http.get<any>(this.apiUrl+regionSeleccionada);
  }

  
}
