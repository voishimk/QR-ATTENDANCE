import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl='https://dev.matiivilla.cl/duoc/location/region'
  constructor(public http:HttpClient) { }

  getRegion():Observable<any>{
    return this.http.get<any>(this.apiUrl);
 }
  
}
