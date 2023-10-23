import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  
  constructor(private router:Router ){

  }
  alertService: any;
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.autenticacion()) {
      return true;
    }
    alert("Primero debes ingresar a tu cuenta");
    //route login:
    this.router.navigate(['/login']);
    return false;

  }
  
  autenticacion(): boolean{
  
    return false;
    
  }
  
  

}
